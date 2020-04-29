const http = require('http');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const path = require('path')
const express = require('express');
const app = express();


const hostname = "127.0.0.1";

app.use((req, res, next) => {
    console.log('Time: ' + Date.now())
    next()
})

app.use((err, req, res, next) => {
    console.err(err)
    res.status(500).send('Something went wrong.')
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+ '/views/index.html'));
})

app.listen(port, hostname, () => {
    console.log(`Server listening on port: ${port}`);
});
