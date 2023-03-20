const express = require('express');
const data = require('./users.json');
const bodyParser = require('body-parser');

const users = data.users;
const app = express();
app.use(bodyParser.json());

console.log(users);

app.get('/users', (req, res) => {
    res.status(200).send(users);
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    let response = 'No user with id ${id}';
    for (const user of users) {
        if (parseInt(id, 10) === user.id) {
            response = user;
            break;
        }
    }
    res.status(200).send(response);
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).send(users);
});


app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    for (const user of users) {
        if (parseInt(id, 10) === user.id) {
            const index = users.indexOf(user);
            users[index] = updatedUser;
            break;
        }
    }
    res.status(200).send(updatedUser);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    for (const user of users) {
        if (parseInt(id, 10) === user.id) {
            const index = users.indexOf(user);
            users.splice(index, 1);
        }
    }
    res.send(users);
})


app.listen(port=3000);