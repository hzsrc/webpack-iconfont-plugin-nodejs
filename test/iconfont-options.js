var path = require('path');
var dir = 'test/web_project/'
module.exports = {
    fontName: 'my-app-icon',
     template: path.join(dir, '../../src/templates/css.njk'),
    htmlTemplate: path.join(dir, '../../src/templates/css.njk'),
    svgs: path.join(dir, 'src/svgs/*.svg'),
    fontsOutput: path.join(dir, 'src/fonts/'),
    cssOutput: path.join(dir, 'src/fonts/font.css'),
    jsOutput: path.join(dir, 'src/fonts/fonts.js'),
    namesOutput: path.join(dir, 'src/fonts/names.txt'),
    htmlOutput: path.join(dir, 'src/fonts/font-preview.html'),
    //formats: ['ttf', 'woff2', 'woff', 'svg'],
    cssPrefix: 'my-icon'
};
