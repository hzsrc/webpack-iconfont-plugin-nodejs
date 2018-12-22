var md5 = require('./md5');
var defaultOptions = require('./defaultOptions')
var globFiles = require('./globFiles')
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

    var result = {options}
    return globFiles(options.svgs)
        .then(foundFiles => {
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
        .then(cssHtmlJs => {
            return Object.assign(result, cssHtmlJs)
        })
        .catch(e => {
            console.error(e)
        })
}
