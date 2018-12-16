var globby = require('globby');
var path = require('path');

var md5 = require('./md5');
var defaultOptions = require('./defaultOptions')
var getGlyphDatas = require('./getGlyphDatas')
var glyphs2svgFont = require('./glyphs2svgFont')
var svgFont2otherFonts = require('./svgFont2otherFonts')
var glyphs2cssAndHtml = require('./glyphs2cssAndHtml')


module.exports = function (userOptions) {
    let options = Object.assign(
        {},
        defaultOptions,
        userOptions,
        {
            cssPrefix: userOptions.cssPrefix || userOptions.fontName
            // fileMark: userOptions.fileMark || (+new Date()).toString(16)
        }
    );

    const {svgs} = options;
    var result = {options}
    return globby([].concat(svgs))
        .then(foundFiles => {
            const filteredFiles = foundFiles.filter(
                foundFile => path.extname(foundFile) === '.svg'
            );

            if (filteredFiles.length === 0) {
                throw new Error(
                    'Svg glob patterns specified did not match any svgs:\n' + svgs
                );
            }
            return getGlyphDatas(foundFiles, options)
        })
        .then(glyphDatas => {
            result.glyphDatas = glyphDatas;
            return glyphs2svgFont(glyphDatas, options)
        })
        .then(svg => {
            return svgFont2otherFonts(svg, options)
        })
        .then(fonts => {
            Object.assign(result, fonts)
            var fileMark = md5(result.svg).slice(0, 8);
            return glyphs2cssAndHtml(fileMark, result.glyphDatas, options)
        })
        .then(cssHtml => {
            return Object.assign(result, cssHtml)
        })
        .catch(e => {
            console.error(e)
        })
}
