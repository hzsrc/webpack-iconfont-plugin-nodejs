const nodify = require('nodeify');
const path = require('path');
const fs = require('fs');
const generate = require('./generate')
const writeFiles = require('./writeFiles')
var thro_debs = require('thro-debs')
var globby = require('globby');

module.exports = class IconfontPlugin {
    constructor(options = {}) {
        const required = ['svgs', 'fontsOutput', 'cssOutput'];

        for (let r of required) {
            if (!options[r]) {
                throw new Error(`Require '${r}' option`);
            }
        }
        this.options = Object.assign({}, options);

        this.compile = this.compile.bind(this);
        this.watch = this.watch.bind(this);
    }

    getBinder(compiler, event) {
        return compiler.hooks
            ? compiler.hooks[event].tapAsync.bind(compiler.hooks[event], 'webpackIconfontPluginNodejs')
            : compiler.plugin.bind(compiler, event)
    }

    apply(compiler) {
        // 生成的字体和css会被作为源码被提交，故npm run build时不需再次生成。
        // 而生成的字体和css在npm run dev时也会被webpack监听（watch），所以只需在svg变动时，重新生成字体和css即可
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined) {
            //this.getBinder(compiler, 'run')(this.compile);
            this.compile()
            this.watch();
        }
    }

    build(callback) {
        return nodify(
            generate.byGlobby(this.options)
                .then(result => writeFiles(result))
                .then(ret => {
                    console.log('Font+css have been built with ' + ret.glyphDatas.length + ' svg-icons.');
                    return ret
                })
                .catch(console.error.bind(console)),
            error => callback && callback(error)
        );
    }

    compile(compiler, callback) {
        this.build(callback)
    }

    watch() {
        var comileDebounce = thro_debs.debounce(800, this.build.bind(this));
        var svgs = [].concat(this.options.svgs);

        // 只有一个文件夹时，监视文件夹。支持新增。/ab/c/*.svg
        if (svgs.length === 1) {
            var dir = path.dirname(svgs[0]).replace('*.svg', '');
            if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
                fs.watch(dir, (event, filename) => {
                    if (filename && filename.length > 4 && filename.slice(-4) === '.svg') {
                        comileDebounce()
                    }
                });
                return
            }
        }

        // 监视每个文件。/ab/c/**/*.svg
        globby(svgs).then(files => {
            files.map(file => {
                fs.watch(file, (event, filename) => {
                    comileDebounce()
                })
            })
        })
    }

}
