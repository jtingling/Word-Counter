const fs = require('fs');
let path = require('path');



module.exports.openFile = function () {
    return new Promise((resolve, reject) => {
        fs.readFile('./file-storage/textfile', 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

module.exports.listData = function (data) {
    let wordList = [];
    let startPos, endPos = 0;
    let docLength = data.length;
    for (let i = 0; i < docLength; i++) {
        if (data[i] == ' ' ||
            data[i] == '.' ||
            data[i] == '?') {
            endPos = i;
            wordList.push(data.slice(startPos, endPos).trim());
            startPos = endPos;
        }
    }
    return getNumWords(wordList);
}

let getNumWords = function (list) {
    let numWords = list.length; 
    let counter = 0;
    list.forEach((item) => {
        if (item == '.' || item == '?') {
            counter++;
        }
    })
    numWords = numWords - counter;

    console.log(numWords);
    return numWords;
}
