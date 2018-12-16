var path = require('path');
var dir = 'test/web_project/'
module.exports = {
    fontName: 'my-app-icon',
    // template: path.join(dir, 'assets/fonts/css.njk'),
    svgs: path.join(dir, 'assets/svgs/*.svg'),
    fontsOutput: path.join(dir, 'assets/fonts/'),
    cssOutput: path.join(dir, 'assets/fonts/font.css'),
    jsOutput: path.join(dir, 'assets/fonts/fonts.js'),
    htmlOutput: path.join(dir, 'assets/fonts/font-preview.html'),
    //formats: ['ttf', 'woff2', 'woff', 'svg'],
    cssPrefix: 'my-icon'
};
