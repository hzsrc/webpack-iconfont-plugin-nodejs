var globby = require('globby');
var path = require('path');

module.exports = function (svgsGlobbyOrFileNames) {
    var arr = [].concat(svgsGlobbyOrFileNames)
    if (arr.join('|').indexOf('*') == -1) {
        return Promise.resolve(filterFiles(arr))
    }
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


