var path = require('path');
var dir = path.resolve(__dirname, 'web_project/')
module.exports = {
    fontName: 'my-app-icon',
    // template: path.resolve(dir, 'assets/fonts/css.njk'),
    svgs: path.resolve(dir, 'assets/svgs/*.svg'),
    fontsOutput: path.resolve(dir, 'assets/fonts/'),
    cssOutput: path.resolve(dir, 'assets/fonts/font.css'),
    jsOutput: path.resolve(dir, 'assets/fonts/fonts.js'),
    //htmlOutput: path.resolve(dir, 'assets/fonts/font-preview.html'),
    //formats: ['ttf', 'woff2', 'woff', 'svg'],
    cssPrefix: 'my-icon'
};
