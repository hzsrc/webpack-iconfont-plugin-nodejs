var createThrottle = require('async-throttle');
var defaultMetadataProvider = require('svgicons2svgfont/src/metadata');
var fs = require('fs');
var xml2js = require('xml2js');

module.exports = function getGlyphDatas(files, options) {
    const xmlParser = new xml2js.Parser();
    const throttle = createThrottle(options.maxConcurrency);

    //并发执行的，顺序会不确定。先定好顺序
    var orderedFiles = files.sort((f1, f2) => f1 > f2 ? 1 : -1)
        .map((file, index) => ({file, startUnicode: options.startUnicode + index}));

    return Promise.all(
        orderedFiles.map(fileInfo =>
            throttle(
                () =>
                    new Promise((resolve, reject) => {
                        const srcPath = fileInfo.file;
                        const glyph = fs.createReadStream(srcPath);
                        let glyphContents = '';

                        return glyph
                            .on('error', glyphError => reject(glyphError))
                            .on('data', data => {
                                glyphContents += data.toString();
                            })
                            .on('end', () => {
                                if (glyphContents.length === 0) {
                                    return reject(
                                        new Error(`Empty file ${srcPath}`)
                                    );
                                }

                                return xmlParser.parseString(
                                    glyphContents,
                                    error => {
                                        if (error) {
                                            return reject(error);
                                        }

                                        const glyphData = {
                                            contents: glyphContents,
                                            srcPath
                                        };

                                        return resolve(glyphData);
                                    }
                                );
                            });
                    })
            ).then(
                glyphData =>
                    new Promise((resolve, reject) => {
                        var metadataProvider = options.metadataProvider ||
                            defaultMetadataProvider({
                                prependUnicode: options.prependUnicode,
                                startUnicode: fileInfo.startUnicode
                            });
                        metadataProvider(
                            glyphData.srcPath,
                            (error, metadata) => {
                                if (error) {
                                    return reject(error);
                                }
                                glyphData.metadata = metadata;
                                return resolve(glyphData);
                            }
                        );
                    })
            )
        )
    );
}
