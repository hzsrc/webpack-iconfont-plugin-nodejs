var os = require('os');
module.exports = {
    ascent: undefined,
    centerHorizontally: true,
    descent: 0,
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
            version: null
        }
    },
    glyphTransformFn: null,
    maxConcurrency: os.cpus().length,
    metadata: null,
    metadataProvider: null,
    fontHeight: 1000, // 这个与normalize配合解决精确度问题
    normalize: true,
    prependUnicode: false,
    round: 10e12,
    startUnicode: 0x554a,
    template: 'css',
    verbose: false
}
