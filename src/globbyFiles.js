var globby = require('globby');
var path = require('path');

module.exports = function (svgsGlobbyOrFileNames) {
    var arr = [].concat(svgsGlobbyOrFileNames)
    if (arr.join('|').indexOf('*') == -1) {
        return Promise.resolve(filterFiles(arr))
    }
    //新版本globby不支持 \，必须 /。坑货！
    for (var i = 0; i < arr.length; i++) arr[i] = arr[i].replace(/\\/g, '/')
    return globby(arr).then(filterFiles);

    function filterFiles(foundFiles) {
        const filteredFiles = foundFiles.filter(
            foundFile => path.extname(foundFile).toLowerCase() === '.svg'
        );

        if (filteredFiles.length === 0) {
            throw new Error(
                'Svg glob patterns specified did not match any svgs:\n' + svgsGlobbyOrFileNames
            );
        }
        return filteredFiles
    }
}


