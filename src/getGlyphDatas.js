var createThrottle = require('async-throttle');
var defaultMetadataProvider = require('svgicons2svgfont/src/metadata');
var fs = require('fs');
// var xml2js = require('xml2js');

module.exports = function getGlyphDatas(files, options) {
    // const xmlParser = new xml2js.Parser();
    const throttle = createThrottle(options.maxConcurrency);

    //并发执行的，顺序会不确定。先定好顺序
    var orderedFiles = files.sort((f1, f2) => f1 > f2 ? 1 : -1);

    return Promise.all(
        orderedFiles.map((srcPath, index) => {
            return throttle(() => {
                return new Promise((resolve, reject) => {
                    let glyphContents = '';

                    fs.createReadStream(srcPath).on('error', glyphError => reject(glyphError))
                        .on('data', data => {
                            glyphContents += data.toString();
                        })
                        .on('end', () => {
                            if (glyphContents.length === 0) {
                                reject(new Error(`Empty file ${srcPath}`));
                                return
                            }

                            // xmlParser.parseString(glyphContents, error => {
                            //     if (error) {
                            //         return reject(error);
                            //     }
                            const glyphData = {
                                contents: glyphContents,
                                srcPath
                            };

                            resolve(glyphData);
                            // });
                        });
                })
            }).then(glyphData =>
                new Promise((resolve, reject) => {
                    var metadataProvider = options.metadataProvider ||
                        defaultMetadataProvider({
                            prependUnicode: options.prependUnicode,
                            startUnicode: options.startUnicode + index
                        });
                    metadataProvider(glyphData.srcPath, (error, metadata) => {
                        if (error) {
                            return reject(error);
                        }
                        glyphData.metadata = metadata;
                        return resolve(glyphData);
                    });
                })
            )
        })
    );
}
