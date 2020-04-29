const fs = require('fs');
let path = require('path')
let fileList = [];

module.exports.openFile = function () {
    fileList = [];
    fs.readFile('./file-storage/textfile', 'utf8', (err, data) => {
        if (err) throw err;
        fileList.push(data);
        console.log(fileList);
    })
    return fileList;
}
