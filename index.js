
const port = process.env.PORT || 8080;
const path = require('path')
const express = require('express');
const app = express();
const multer = require('multer');
const { openFile, listData, topWords, getNumWords } = require('./data-service.js');


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './file-storage')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname)
    }
})

let upload = multer({ storage: storage });
app.use(express.static(__dirname + '/resources'))
const hostname = "127.0.0.1";

app.set('view engine', 'ejs')

app.use((err, req, res, next) => {
    console.err(err)
    res.status(500).send('Something went wrong.')
})

app.get('/', (req, res) => {
    let dash = ' ';
    let dashWords = [{words : ' ', frequency : ' '}]
    res.render('./index.ejs', {wordCount: dash, topWords : dashWords});
})

app.post('/', upload.single('textfile'), (req, res) => {
    if (req.file.mimetype != 'text/plain') {
        res.end("Wrong file type. Please use only .txt file extensions.");
    }
    openFile().then((data) => {
        let count = getNumWords(listData(data))
        let wordTally = topWords(listData(data))
        res.render('./index.ejs', {wordCount : count, topWords : wordTally})
    }).catch((err) => {
        console.log(err);
    })
})

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
