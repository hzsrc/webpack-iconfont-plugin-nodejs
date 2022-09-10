var createThrottle = require('async-throttle');
var defaultMetadataProvider = require('svgicons2svgfont/src/metadata');
var fs = require('fs');
// var xml2js = require('xml2js');

module.exports = function getGlyphDatas(files, options) {
    // const xmlParser = new xml2js.Parser();
    const throttle = createThrottle(options.maxConcurrency);

    //并发执行的，顺序会不确定。先定好顺序
    var orderedFiles = files.sort((f1, f2) => f1 < f2 ? -1 : 1);

    return Promise.all(
        orderedFiles.map((fileOrData, index) => {
            return throttle(() => {
                return new Promise((resolve, reject) => {
                    if (fileOrData.svgContent) {
                        //传入的不是文件路径，而直接是svg数据: {svgContent, fileName}
                        resolve({ contents: fileOrData.svgContent, srcPath: fileOrData.fileName })
                        return
                    }

                    let glyphContents = '';
                    fs.createReadStream(fileOrData)
                        .on('error', glyphError => reject(glyphError))
                        .on('data', data => {
                            glyphContents += data.toString();
                        })
                        .on('end', () => {
                            if (glyphContents.length === 0) {
                                reject(new Error(`Empty file ${fileOrData}`));
                                return
                            }

                            // xmlParser.parseString(glyphContents, error => {
                            //     if (error) {
                            //         return reject(error);
                            //     }
                            const glyphData = { contents: glyphContents, srcPath: fileOrData };
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
