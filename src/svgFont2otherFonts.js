var svg2ttf = require('svg2ttf');
var ttf2eot = require('ttf2eot');
var ttf2woff = require('ttf2woff');
var ttf2woff2 = require('ttf2woff2-no-gyp');

module.exports = function (svg, options) {
    var fonts = {}
    var ttf = Buffer.from(
        svg2ttf(
            svg.toString(),
            (options.formatsOptions && options.formatsOptions.ttf) || {}
        ).buffer
    );

    if (options.formats.indexOf('eot') !== -1) {
        fonts.eot = Buffer.from(ttf2eot(ttf).buffer);
    }

    if (options.formats.indexOf('woff') !== -1) {
        fonts.woff = Buffer.from(
            ttf2woff(ttf, {
                metadata: options.metadata
            }).buffer
        );
    }

    if (options.formats.indexOf('woff2') !== -1) {
        fonts.woff2 = ttf2woff2(ttf);
    }


    if (options.formats.indexOf('svg') !== -1) {
        fonts.svg = svg;
    }
    if (options.formats.indexOf('ttf') !== -1) {
        fonts.ttf = ttf;
    }

    return fonts;
}
