const http = require('http');
const URL = require('url').URL;

const basket = ["Milk", "Bread", "Hydrochloric Acid", "Bananas"];

http.createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const parameters = url.searchParams;
    let itemNum = parameters.get('itemNum');
    let item = basket[itemNum];
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(`You selected item ${itemNum}: ${item}`);
}).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');