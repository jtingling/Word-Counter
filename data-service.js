const fs = require('fs');
let path = require('path')

module.exports.openFile = function () {
    return new Promise((resolve, reject) => {
        fs.readFile('./file-storage/textfile', 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}
