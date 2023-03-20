const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('HTTP request: GET Suceeded/');
});

app.post('/', (req, res) => {
    res.send('HTTP request: POST Suceeded/');
});

app.put('/', (req, res) => {
    res.send('HTTP request: PUT Suceeded/');
});

app.delete('/', (req, res) => {
    res.send('HTTP request: DELETE Suceeded/');
});

app.listen(port=3000)
console.log('Server running at http://127.0.0.1:3000/');