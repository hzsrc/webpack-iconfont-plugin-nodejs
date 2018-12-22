const path = require('path');
const fs = require('fs');

module.exports = function (result) {
    var options = result.options;
    var fnDatas = {}
    options.formats.map(format => {
        var data = result[format]
        if (data) {
            var destFilename = path.resolve(options.fontsOutput, `${options.fontName}.${format}`);
            fnDatas[destFilename] = data
        }
    })

    fnDatas[options.cssOutput] = result.css;

    if (options.htmlOutput) {
        fnDatas[options.htmlOutput] = result.html;
    }
    if (options.jsOutput) {
        fnDatas[options.jsOutput] = result.js;
    }
    return Promise.all(
        Object.keys(fnDatas).map(fn => writeFile(fn, fnDatas[fn]))
    ).then(t => result)
}

function writeFile(fileName, data) {
    return new Promise((resolve, reject) => {
        var dir = path.dirname(fileName);
        mkdirs(dir)
        fs.writeFile(fileName, data, err => {
            if (err) reject(err)
            else resolve()
        });
    })
}

function mkdirs(dirpath) {
    if (!fs.existsSync(path.dirname(dirpath))) {
        mkdirs(path.dirname(dirpath));
    }
    if (!fs.existsSync(dirpath)) {
        fs.mkdirSync(dirpath);
    }
}

