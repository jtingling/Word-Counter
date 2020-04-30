
const port = process.env.PORT || 8080;
const path = require('path')
const express = require('express');
const app = express();
const multer = require('multer');
const { openFile, listData } = require('./data-service.js');


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './file-storage')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname)
    }
})

let upload = multer({ storage: storage });
const indexPath = path.join(__dirname + '/views/index.html'); 

const hostname = "127.0.0.1";

let textdata = [];

app.set('view engine', 'ejs')

app.use((err, req, res, next) => {
    console.err(err)
    res.status(500).send('Something went wrong.')
})

app.get('/', (req, res) => {
    res.sendFile(indexPath);
})

app.post('/', upload.single('textfile'), (req, res) => {
    if (req.file.mimetype != 'text/plain') {
        res.end("Wrong file type. Please use only .txt file extensions.");
    }
    openFile().then((data) => {
        let count = listData(data)
        res.render('./results.ejs', {wordCount : count})
    }).catch((err) => {
        console.log(err);
    })
})

app.listen(port, hostname, () => {
    console.log(`Server listening on port: ${port}`);
});
