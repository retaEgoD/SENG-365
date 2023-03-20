const express = require('express');
const data = require('./users.json');
const bodyParser = require('body-parser');

const users = data.users;
const app = express();
app.use(bodyParser.json());

console.log(users);

// Get all users.
app.get('/users', (req, res) => {
    res.status(200).send(users);
});

// Get one user.
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

// Add a new user.
app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).send(users);
});

// Replace a user.
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

// Delete a user.
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    for (const user of users) {
        if (parseInt(id, 10) === user.id) {
            const index = users.indexOf(user);
            users.splice(index, 1);
        }
    }
    res.send(users);
});

// Add a follower to a user.
app.patch('/users/:id', (req, res) => {
    const id = req.params.id;
    const followed = req.body;
    console.log(followed);
    let response = 'No user with id ${id}'
    for (const user of users) {
        if (parseInt(id, 10) === user.id) {
            user.following.push(followed);
            response = user.following;
            break;
        }
    }
    res.status(200).send(response);
})

// Remove a follower to a user.
app.patch('/users/:id/:unfollowed', (req, res) => {
    const id = req.params.id;
    for (const user of users) {

    }
})


app.listen(port=3000);