var path = require('path');
var dir = 'test/web_project/'
module.exports = {
    fontName: 'my-app-icon',
    // template: path.join(dir, 'src/fonts/css.njk'),
    svgs: path.join(dir, 'src/svgs/*.svg'),
    fontsOutput: path.join(dir, 'src/fonts/'),
    cssOutput: path.join(dir, 'src/fonts/font.css'),
    jsOutput: path.join(dir, 'src/fonts/fonts.js'),
    htmlOutput: path.join(dir, 'src/fonts/font-preview.html'),
    //formats: ['ttf', 'woff2', 'woff', 'svg'],
    cssPrefix: 'my-icon'
};
