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
//Converts sentences into words
module.exports.listData = function (data) {
    let wordList = [];
    let startPos, endPos = 0;
    let docLength = data.length;
    for (let i = 0; i < docLength; i++) {
        if (data[i] == ' ' ||
            data[i] == '.' ||
            data[i] == '?') {
            endPos = i;
            wordList.push((data.slice(startPos, endPos).trim()).toLowerCase());
            startPos = endPos;
        }
    }
    return checkWord(wordList);
}

//Cleans each word for erroneous grammer.
checkWord = function (list) {
    let newList = [];
    let currentWord = "";
    for (let word of list) {
        currentWord = word;
        if (word[word.length - 1] == ',') {
            currentWord = word.slice(0, (word.length-1));
            
        } else if (word.slice(0,5) == './n/n') {
            currentWord = word.slice(5, word[word.length -1]);
            console.log(currentWord)
        }
        newList.push(currentWord);
    }
    return newList
}

//Removes punctuation and tallys words only
module.exports.getNumWords = function (list) {
    let numWords = list.length;
    let counter = 0;
    list.forEach((item) => {
        if (item == '.' || item == '?') {
            counter++;
        }
    })
    numWords = numWords - counter;
    return numWords;
}

//Counts frequency of words used.
module.exports.topWords = function (list) {
    let sortedList = list.sort(); //list of all words
    let wordDict = [...new Set(list)]; //list of unique words
    let wordTally = [];
    let counter;

    for (let selectedWord of wordDict) {
        counter = 0;
        if (selectedWord != '.' && selectedWord != '?' && selectedWord != '!' && selectedWord.length > 2) {
            for (let word of sortedList) {
                if (selectedWord === word) {
                    counter++;
                }
            }
            if (counter > 1) {
                wordTally.push({ word: selectedWord, frequency: counter });
            }

        }
    }
    return wordTally;
}
