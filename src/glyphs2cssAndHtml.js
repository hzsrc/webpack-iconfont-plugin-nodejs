var nunjucks = require('nunjucks');
var os = require('os');
var fs = require('fs');
var path = require('path');

module.exports = function (fileMark, glyphDatas, options) {
    let cssTemplateFile = options.template;

    if (!fs.existsSync(cssTemplateFile)) {
        cssTemplateFile = path.resolve(__dirname, `templates/${options.template}.njk`);
    }

    let htmlTemplateFile = path.resolve(__dirname, `templates/html.njk`);

    // options.cssOutput = path.resolve(options.cssOutput);
    if (options.htmlOutput === undefined) {
        options.htmlOutput = path.join(path.dirname(options.cssOutput), 'font-preview.html');
    }
    if (options.htmlOutput) {
        // html模板中css文件的相对文件名
        options.htmlCssFile = path.relative(path.dirname(options.htmlOutput), options.cssOutput);
    }
    // css模板中的字体文件的相对路径
    options.cssFontPath = path.relative(path.dirname(options.cssOutput), options.fontsOutput);
    if (options.cssFontPath !== '') {
        options.cssFontPath += '/'
    }

    options.fileMark = fileMark;

    // console.log(JSON.stringify(options, null ,4))

    const nunjucksOptions = Object.assign(
        {
            glyphs: glyphDatas.map(glyphData => {
                if (typeof options.glyphTransformFn === 'function') {
                    options.glyphTransformFn(
                        glyphData.metadata
                    );
                }
                return glyphData.metadata;
            })
        },
        JSON.parse(JSON.stringify(options))
    );

    var cssHtml = {
        css: nunjucks.render(cssTemplateFile, nunjucksOptions),
    }
    if (options.htmlOutput) {
        cssHtml.html = nunjucks.render(htmlTemplateFile, nunjucksOptions)
    }
    if (options.jsOutput) {
        cssHtml.js = 'export default ' + JSON.stringify(glyphDatas.map(g => {
            return {
                name: g.metadata.name,
                unicode: g.metadata.unicode[0].charCodeAt(0).toString(16),
                svg: g.contents
            }
        }), null, 4) + '\n'
    }

    return cssHtml;
}

