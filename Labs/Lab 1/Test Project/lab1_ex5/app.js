const express = require('express');
const app = express();
app.get('/', (req, res) => {
    // Displays content for the page at 'link/'
    res.send('Try adding /r to the URL!');
    });
app.get('/r', (req, res) => {
    // Displays content for the page at 'link/r'
    res.send('Hello World!');
});
app.use((req, res, next) => {
    // Displays 404 not found if navigating to a link/directory with no get request.
    res.status(404)
    .send('404 Not Found');
    });
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    });
