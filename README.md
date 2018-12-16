# webpack-iconfont-plugin-nodejs

SVG to iconfont conversion plugin for webpack.

## Features:

* Supported font formats: WOFF2, WOFF, EOT, TTF and SVG.
* Semantic: uses Unicode private use area.
* Cross-browser: IE8+.
* Generates SCSS file, custom templates possible.

## Usage:

`build/svg2font.js:`

```js
var IconfontPlugin = require('webpack-iconfont-plugin-nodejs');
var path = require('path');

new IconfontPlugin({
  fontName: 'flaginfo-app-icon',
  svgs: path.resolve(__dirname, '../src/assets/fonts/svg/*.svg'),
  template: path.resolve(__dirname, '../src/assets/fonts/css.njk'),
  fontsOutput: path.resolve(__dirname, '../src/assets/fonts'),
  cssOutput: path.resolve(__dirname, '../src/styles/font.css'),
  htmlOutput: path.resolve(__dirname, '../src/assets/fonts/font-preview.html'),
  formats: ['ttf', 'woff2', 'woff', 'svg'],
  cssPrefix: 'van-icon'
}).compile(null, cb => {
  console.log('Done')
})

```

Then you can run this command to build iconfont by svg:
```bash
node build/svg2font.js
```
Or you can set this command to script of package.json, and run it by npm.

## Options

#### `svgs` (required)
Type: `String`

File path(s) or glob(s) to svg icons. Recommend to use *.svg like this: /src/project/assets/*.svg, this can watch svgs by directory.


#### `fontsOutput` (required)
Type: `String`

Destination for generated font files (directory).


#### `cssOutput` (required)
Type: `String`

Destination for generated scss file (file name).

### `htmlOutput`
Type: `String` Default value: [path of cssOutput] + `/font-preview.html`. Or `false` value.

Destination for generated html preview file (file name). If `false`, no html output.

#### `template`
Type: `String` Default value: `css`

Type of built in style templates ('css', 'scss', 'scss-mixins') or path to custom template.


#### `fontName`
Type: `String` Default value: `iconfont`

This dtermines both the font family name (e.g. `font-family: 'iconfont'`, as well as the prefix for scss variables, mixins and classnames (e.g. `.iconfont-arrow`).


#### `fontHeight`
Type: `Number` Default value: `MAX(icons.height)`

The outputted font height (defaults to the height of the highest input icon).


#### `normalize`
Type: `Boolean` Default value: `false`

Normalize icons by scaling them all to the height of the highest icon.


#### `cssPrefix`
Type: `String` Default value: fontName

Css className prefix.
