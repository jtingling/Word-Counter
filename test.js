const sortedList = ["hello", "goodbye", "hello", "salutations", "welcome", "welcome", "goodbye", "goodbye"]
const wordDict = [...new Set(wordList)];
let wordTally = [];
let counter;

for (let selectedWord of wordDict) {
    counter = 0;
    for (let word of sortedList) {
        if (selectedWord === word) {
            counter++;
        }
    }
    wordTally.push({word: selectedWord, frequency: counter });
}
console.log(wordTally);
//initialize counter
//Loop throught each set
//set counter to zero
//Nest another loop over WordList
//compare each word in the set with each word in the list
//if words are equal, increase counter by 1
//exit inner loop
//push an object containing key: word, frequency: counter into array

