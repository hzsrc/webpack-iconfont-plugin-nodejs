var os = require('os');
module.exports = {
    centerHorizontally: true,
    //centerVertically: true,
    fixedWidth: false,
    fontId: null,
    fontName: 'iconfont',
    fontStyle: '',
    fontWeight: '',
    formats: ['svg', 'ttf', 'eot', 'woff2', 'woff'],
    formatsOptions: {
        ttf: {
            copyright: null,
            ts: null,
            version: null,
        }
    },
    glyphTransformFn: null,
    maxConcurrency: os.cpus().length,
    metadata: null,
    metadataProvider: null,
    fontHeight: 1024, // 这个与normalize配合解决精确度问题, 即units-per-em（UPM）
    //descent: 212,     // 基线向下下沉空间，正数，812=1024-212
    //ascent: 812,
    normalize: true,
    prependUnicode: false,
    round: 10e12,
    startUnicode: 0x554a,
    template: 'css',
    verbose: false
}
