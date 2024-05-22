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
  // htmlTemplate: path.join(dir, 'html.njk'),
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
          namesOutput: path.join(dir, 'fonts/names.txt'),
          // formats: ['ttf', 'woff', 'svg'],
        }),
    ]
};

```

## Options

#### `svgs` (required)
Type: `String` | `[String]` | `[{ fileName:String, svgContent:String }, ...]`   
File path(s) or glob(s) to svg icons. Recommend to use *.svg like this: `svgs: '/src/project/src/*.svg'`, this can watch svgs by a directory.  

Or array of svg-data with `fileName`(must be *.svg) and `svgContent` like this:
```js
svgs: [
    {
        fileName: 'my-svg1.svg',
        svgContent: '<svg xmlns="http://www.w3.org/2000/svg">......</svg>'
    },{
        fileName: 'mySvg2.svg',
        svgContent: '<svg xmlns="http://www.w3.org/2000/svg">......></svg>'
    }
]
```


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
Type of built in style templates ('css', 'scss', 'scss-mixins') or full path to custom template.

#### `htmlTemplate`
Type: `String`    
Default value: `templates/html.njk` 
Full path to custom html template.

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

#### `namesOutput`
Type: `String`    
Default value: undefined.    
Path of a txt file which contains all icon names. c


#### `jsPrefix`
Type: `String`    
Default value: '/* eslint-disable */\n'    
Js file content prefix.


#### `cssFontPath`
Type: `String`    
Default value: path.relative(path.dirname(options.cssOutput), options.fontsOutput);    
Font url path in `cssOutput` file.

#### `glyphTransformFn`
Type: `Function`    
Default value: undefined;    
A function to modify glyphData.metadata. Optional.

#### `notWatchFile`
Type: `Boolean`    
Default value: `false`;    
Do not watch `svgs` files. Optional.

#### `maskPwd`
Type: `Boolean`    
Default value: `false`;  use `true` to generate ascii chars font as a black dot.    
If you use `<input type="password"/>`, the browser will show a dialog to ask user for saving password. This will take security issues because the saved passwords can be decrypted.    
To prevent this happening, you can use `<input type="text" style="font-family:'my-app-icon'"/>`, and it can show all the ascii chars as black dots.


#### Other options for advanced
startUnicode: specify start char unicode, default is 0x554a.    
descent: it is useful for vertical align, default is 0.    

Other options such as `startUnicode`, `prependUnicode` etc. in [defaultOptions.js](https://github.com/hzsrc/webpack-iconfont-plugin-nodejs/blob/master/src/defaultOptions.js).     

Please refer to:    
https://www.npmjs.com/package/svgicons2svgfont    
https://www.npmjs.com/package/svg2ttf    
https://www.npmjs.com/package/ttf2eot    
https://www.npmjs.com/package/ttf2woff    
https://www.npmjs.com/package/ttf2woff2    
