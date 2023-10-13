var path = require('path').posix;
var dir = path.join(__dirname, 'web_project');

module.exports = {
    fontName: 'my-app-icon',
    template: 'css',
    //htmlTemplate: path.join(dir, 'src/html.njk'),
    svgs: path.join(dir, 'src/svgs/**/*.svg'),
    fontsOutput: path.join(dir, 'src/fonts/'),
    cssOutput: path.join(dir, 'src/fonts/font.css'),
    jsOutput: path.join(dir, 'src/fonts/fonts.js'),
    namesOutput: path.join(dir, 'src/fonts/names.txt'),
    htmlOutput: path.join(dir, 'src/fonts/font-preview.html'),
    //formats: ['ttf', 'woff2', 'woff', 'svg'],
    cssPrefix: 'my-icon'
};
