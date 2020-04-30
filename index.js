const http = require('http');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const path = require('path')
const express = require('express');
const app = express();
const multer = require('multer');
const fileOpen = require('./data-service.js');


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './file-storage')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname)
    }
})

let upload = multer({storage: storage});


const hostname = "127.0.0.1";

let textdata = [];

app.use((req, res, next) => {
    console.log("success.")
    next()
})

app.use((err, req, res, next) => {
    console.err(err)
    res.status(500).send('Something went wrong.')
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+ '/views/index.html'));
})

app.post('/', upload.single('textfile'), (req, res) => {
    if (req.file.mimetype != 'text/plain') {
        res.end("Wrong file type. Please use only .txt file extensions.");
    }
    fileOpen.openFile().then(data => {
        res.end(data);
    }).catch((err) => {
        console.err(err);
    })
})

app.listen(port, hostname, () => {
    console.log(`Server listening on port: ${port}`);
});
