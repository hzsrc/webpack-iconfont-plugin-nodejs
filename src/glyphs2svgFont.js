var Readable = require('stream').Readable;
var SVGIcons2SVGFontStream = require('svgicons2svgfont');

module.exports = function svgIcons2svgFontFn(glyphDatas, options) {
    let svg = '';

    return new Promise((resolve, reject) => {
        const fontStream = new SVGIcons2SVGFontStream({
            ascent: options.ascent,
            centerHorizontally: options.centerHorizontally,
            descent: options.descent,
            fixedWidth: options.fixedWidth,
            fontHeight: options.fontHeight,
            fontId: options.fontId,
            fontName: options.fontName,
            fontStyle: options.fontStyle,
            fontWeight: options.fontWeight,
            // eslint-disable-next-line no-console, no-empty-function
            log: options.vebose ? console.log.bind(console) : () => {
            },
            metadata: options.metadata,
            normalize: options.normalize,
            round: options.round
        })
            .on('finish', () => {
                return resolve(svg)
            })
            .on('data', data => {
                svg += data;
            })
            .on('error', error => reject(error));

        glyphDatas.forEach(glyphData => {
            const glyphStream = new Readable();

            glyphStream.push(glyphData.contents);
            glyphStream.push(null);

            glyphStream.metadata = glyphData.metadata;

            fontStream.write(glyphStream);
        });

        fontStream.end();
    });
}
