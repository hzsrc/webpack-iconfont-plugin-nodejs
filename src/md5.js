var crypto = require('crypto');
module.exports = function (str) {
    var md5 = crypto.createHash('md5');
    md5.update(str);
    return md5.digest('hex');
}
