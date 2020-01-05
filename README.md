# webpack-iconfont-plugin-nodejs

Use svg files to build iconfont files(ttf,woff2,woff,eot,svg), css file, js data file and html-preview file.

## Features:

* Iconfont output formats: WOFF2, WOFF, EOT, TTF and SVG.
* Generates CSS file, js data file, html-preview file.
* Supports webpack and hot reloading at devlopment time. Iconfont files and css file will be rebuilt while any svg file changed or added, then page will refresh.
* Supports running by nodejs directly.
* Fixed output files with the same svg files. It means that if the svg files are not changed, all the output files(ttf,woff,css...) will not change, even though you build them again.
* High iconfont precision.

## Test for preview:
````bash
git clone https://github.com/hzsrc/webpack-iconfont-plugin-nodejs.git
cd webpack-iconfont-plugin-nodejs
npm install
npm run dev
````
Or visit this preview: http://test.hz300.com/webpack4/iconfontPreview.html


## Install:
`npm install webpack-iconfont-plugin-nodejs`


## Usage:
You can use it by nodejs directly or use it in webpack
#### 1. Use by nodejs directly:   

`build/svg2font.js:`

```js
var WebpackIconfontPluginNodejs = require('webpack-iconfont-plugin-nodejs');
var path = require('path');
var dir = 'test/web_project/'
var options = {
  fontName: 'my-icons',
  cssPrefix: 'ico',
  svgs: path.join(dir, 'svgs/*.svg'),
  // template: path.join(dir, 'css.njk'),
  fontsOutput: path.join(dir, 'fonts/'),
  cssOutput: path.join(dir, 'fonts/font.css'),
  htmlOutput: path.join(dir, 'fonts/_font-preview.html'),
  jsOutput: path.join(dir, 'fonts/fonts.js'),
  // formats: ['ttf', 'woff', 'svg'],
};

new WebpackIconfontPluginNodejs(options).build()
```

Then you can run this command to build iconfont by svg:
```bash
node build/svg2font.js
```
Or you can set this command to script of package.json, and run it by npm.

#### 2. Use by webpack: 
```js
var WebpackIconfontPluginNodejs = require('webpack-iconfont-plugin-nodejs');
var dir = 'test/web_project/'

module.exports = {
    //... others
    plugins: [
        new WebpackIconfontPluginNodejs({
          fontName: 'my-icons',
          cssPrefix: 'ico',
          svgs: path.join(dir, 'svgs/*.svg'),
          // template: path.join(dir, 'css.njk'),
          fontsOutput: path.join(dir, 'fonts/'),
          cssOutput: path.join(dir, 'fonts/font.css'),
          htmlOutput: path.join(dir, 'fonts/_font-preview.html'),
          jsOutput: path.join(dir, 'fonts/fonts.js'),
          // formats: ['ttf', 'woff', 'svg'],
        }),
    ]
};

```

## Options

#### `svgs` (required)
Type: `String`    
File path(s) or glob(s) to svg icons. Recommend to use *.svg like this: /src/project/src/*.svg, this can watch svgs by directory.


#### `fontsOutput` (required)
Type: `String`    
Destination for generated font files (directory).


#### `cssOutput` (required)
Type: `String`    
Destination for generated css file (file name).

#### `fontName`
Type: `String`    
Default value: `iconfont`    
The font family name (e.g. `font-family: 'iconfont'`).


### `htmlOutput`
Type: `String`     
Default value: [path of cssOutput] + `/font-preview.html`. Or `false` value.    
Destination for generated html-preview file (file name). If `false`, no html and js output.

#### `template`
Type: `String`    
Default value: `css`    
Type of built in style templates ('css', 'scss', 'scss-mixins') or path to custom template.

#### `formats`
Type: `Array of String`     
Default value: `['svg', 'ttf', 'eot', 'woff2', 'woff']`    
The output iconfont formats.

#### `cssPrefix`
Type: `String`    
Default value: fontName    
Css className prefix.


#### `jsOutput`
Type: `String`    
Default value: undefined.    
Path of a js file which contains all svg contents. Optional.


#### `jsPrefix`
Type: `String`    
Default value: '/* eslint-disable */\n'    
Js file content prefix.


#### `cssFontPath`
Type: `String`    
Default value: path.relative(path.dirname(options.cssOutput), options.fontsOutput);    
Font url path in `cssOutput` file.


#### Other options for advanced
Other options such as `startUnicode`, `prependUnicode` etc. in [defaultOptions.js](https://github.com/hzsrc/webpack-iconfont-plugin-nodejs/blob/master/src/defaultOptions.js),     
Please refer to:    
https://www.npmjs.com/package/svgicons2svgfont    
https://www.npmjs.com/package/svg2ttf    
https://www.npmjs.com/package/ttf2eot    
https://www.npmjs.com/package/ttf2woff    
https://www.npmjs.com/package/ttf2woff2    
