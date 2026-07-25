var WebpackIconfontPluginNodejs = require('../../src/index');

var options = require('../iconfont-options');

var promise = new WebpackIconfontPluginNodejs(options).build()

promise.then(_ => {
    // const { exec } = require('child\_process');
    // const cmd = `chcp 65001 && xcopy "D:\\src-dl\\webpack-iconfont-plugin-nodejs\\test\\web_project\\src\\fonts\\num*" "D:\\src\\_custom\\BS900-2506\\h5\\src\\css\\num-mono\\" /Y`;
    //
    // exec(cmd, (error, stdout, stderr) => {
    //     console.log(stdout)
    // })
})
