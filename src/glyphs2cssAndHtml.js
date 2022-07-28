var nunjucks = require('nunjucks');
var os = require('os');
var fs = require('fs');
var path = require('path');

module.exports = function (fileMark, glyphDatas, options) {
    var cssTemplateFile = options.template;
    var htmlTemplateFile = options.htmlTemplate;

    var basePath = __dirname;

    if (!fs.existsSync(cssTemplateFile)) {
        cssTemplateFile = path.resolve(basePath, `templates/${options.template || 'css'}.njk`);
    }
    if (!htmlTemplateFile || !fs.existsSync(htmlTemplateFile)) {
        htmlTemplateFile = path.resolve(basePath, `templates/html.njk`);
    }

    // options.cssOutput = path.resolve(options.cssOutput);
    if (options.htmlOutput === undefined) {
        options.htmlOutput = path.join(path.dirname(options.cssOutput), '_font-preview.html');
    }
    if (options.htmlOutput) {
        // html模板中css文件的相对文件名
        options.htmlCssFile = path.relative(path.dirname(options.htmlOutput), options.cssOutput);
    }
    // css模板中的字体文件的相对路径
    if(!options.cssFontPath) {
        options.cssFontPath = path.relative(path.dirname(options.cssOutput), options.fontsOutput);
    }
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
        options
    );

    //nunjucks.configure(basePath);
    var cssHtml = {
        css: render(cssTemplateFile, nunjucksOptions),
    }
    if (options.htmlOutput) {
        cssHtml.html = render(htmlTemplateFile, nunjucksOptions)
    }
    if (options.jsOutput) {
        var json = JSON.stringify(glyphDatas.map(g => {
            return {
                name: g.metadata.name,
                unicode: g.metadata.unicode[0].charCodeAt(0).toString(16),
                svg: g.contents,
            }
        }), null, 4)
        var prefix = options.jsPrefix || '/* eslint-disable */\n';
        cssHtml.js = prefix + 'export default ' + json + '\n'
    }
    if (options.namesOutput) {
        cssHtml.names = glyphDatas.map(g => g.metadata.name).join('\n')
    }

    return cssHtml;
}
function render(file, options) {
    try{
        var tpl = fs.readFileSync(file, 'utf-8')
        return nunjucks.renderString(tpl, options)
    }
    catch (e) {
        console.error(e)
    }
}

/*
// json中的双引号换为单引号
var JsNameReg = /^\w+$/
function json2Js(jsonStr) {
    var js = []
    if (jsonStr) {
        var isInQuot = false
        var quotArr = []
        var lastChar = ''
        for (var i = 0, j = jsonStr.length; i < j; i++) {
            var char = jsonStr[i]
            if (isInQuot) {
                // 记录引号内的
                if (char === '\\') {
                    var nextChar = jsonStr[i + 1] || ''
                    if (nextChar !== '"') {
                        quotArr.push(char)
                    }
                    quotArr.push(nextChar)
                    i++
                } else if (char === '"') {
                    //结束引号内的
                    var quotedStr = quotArr.join('')
                    var nextChar2 = jsonStr[i + 1] || ''
                    var quot = '\''
                    if (nextChar2 === ':' && JsNameReg.test(quotedStr)) {
                        //属性名不需要引号
                        quot = ''
                    }
                    js.push(quot + quotedStr + quot) //换为单引号
                    quotArr = []
                    isInQuot = false
                } else if (char === '\'') {
                    quotArr.push('\\\'')
                } else {
                    quotArr.push(char)
                }
            } else if (char === '"') {
                // 开始记录引号内的
                isInQuot = true
            } else {
                js.push(char)
            }
            lastChar = char
        }
    }
    return js.join('')
}
*/
