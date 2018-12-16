process.env.NODE_ENV = 'production'

var webpack = require('webpack')
var webpackConfig = require('../config/webpack.base.conf')

require('../../nodejs_project/run'); // build font first

webpack(webpackConfig, (err, stats) => {
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')
})
