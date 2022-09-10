var WebpackIconfontPluginNodejs = require('../src/index');
var options = require('./iconfont-options.js')

function test1() {
    new WebpackIconfontPluginNodejs(options).build((err, r) => {
        if (err) throw err
        var names = require('fs').readFileSync('test/web_project/src/fonts/names.txt', 'utf-8')
        if (names != `bookmark
calendar
camera
chat
check
state-beinvited
success
warning`) throw  new Error('生成有误！')
    })
}

var op2 = Object.assign({}, options)
op2.svgs = [
    {
        fileName: 'my-svg1.svg',
        svgContent: '<svg id="chat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="currentcolor">\n' +
            '  <path d="M32 16 A16 12 0 0 0 0 16 A16 12 0 0 0 16 28 L18 28 C20 30 24 32 28 32 C27 31 26 28 26 25.375 L26 25.375 A16 12 0 0 0 32 16"></path>\n' +
            '</svg>'
    },
    {
        fileName: 'mySvg2.svg',
        svgContent: '<svg id="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="currentcolor">\n' +
            '  <path d="M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z"></path>\n' +
            '</svg>'
    },
];
new WebpackIconfontPluginNodejs(op2).build((err, r) => {debugger
    test1()
    if (err) throw err
    var names2 = require('fs').readFileSync('test/web_project/src/fonts/names.txt', 'utf-8')
    if (names2 != `my-svg1
mySvg2`) throw  new Error('生成有误！')
})
