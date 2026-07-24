var path = require('path').posix;
var dir = path.join(__dirname, 'web_project');

module.exports = [{
    fontName: 'my-app-icon',
    template: 'css',
    //htmlTemplate: path.join(dir, 'src/html.njk'),
    svgs: path.join(dir, 'src/svgs/common/**/*.svg'),
    fontsOutput: path.join(dir, 'src/fonts/'),
    cssOutput: path.join(dir, 'src/fonts/font.css'),
    jsOutput: path.join(dir, 'src/fonts/fonts.js'),
    namesOutput: path.join(dir, 'src/fonts/names.txt'),
    htmlOutput: path.join(dir, 'src/fonts/font-preview.html'),
    //formats: ['ttf', 'woff2', 'woff', 'svg'],
    cssPrefix: 'my-icon',
    keepUnicode: true,
}, {
    fontName: 'num-mono',
    template: 'css',
    //htmlTemplate: path.join(dir, 'src/html.njk'),
    svgs: path.join(dir, 'src/svgs/regular/**/*.svg'),
    fontsOutput: path.join(dir, 'src/fonts/'),
    cssOutput: path.join(dir, 'src/fonts/mono.css'),
    jsOutput: path.join(dir, 'src/fonts/mono.js'),
    namesOutput: path.join(dir, 'src/fonts/mono-names.txt'),
    htmlOutput: path.join(dir, 'src/fonts/mono-preview.html'),
    formats: ['ttf', 'woff2', 'svg'],
    cssPrefix: 'my-icon',
    keepUnicode: true,
    ascent: 1174, //基线（baseline=0）往上的高度，正数
    //descent:-205, //基线往下的高度，必须是负数
}, {
    fontName: 'num-mono-ex-lt',
    template: 'css',
    //htmlTemplate: path.join(dir, 'src/html.njk'),
    svgs: path.join(dir, 'src/svgs/extra-light/**/*.svg'),
    fontsOutput: path.join(dir, 'src/fonts/'),
    cssOutput: path.join(dir, 'src/fonts/ex-lt-mono.css'),
    jsOutput: path.join(dir, 'src/fonts/ex-lt-mono.js'),
    namesOutput: path.join(dir, 'src/fonts/ex-lt-mono-names.txt'),
    htmlOutput: path.join(dir, 'src/fonts/ex-lt-mono-preview.html'),
    formats: ['ttf', 'woff2', 'svg'],
    cssPrefix: 'my-icon',
    keepUnicode: true,
    ascent: 1174, //基线（baseline=0）往上的高度，正数
    // descent:10, //基线往下的高度，必须是负数
}];
