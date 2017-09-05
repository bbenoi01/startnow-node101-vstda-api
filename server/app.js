const express = require('express');
const morgan = require('morgan');
const jsonParser = require('body-parser').json;
let counter = 0;
let mockData = [
    {
        todoItemId: 0,
        name: "an item",
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: "another item",
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: "a done item",
        priority: 1,
        completed: true
    }
];

const app = express();

// add your code here
app.use(morgan('dev'));

app.use(jsonParser());

app.get('/', function(req, res) {
    res.status(200).json();
});

app.get('/api/TodoItems', function(req, res) {
    res.status(200).send(mockData);
});

app.get('/api/TodoItems/:number', function(req, res) {

    for(let i = 0; i < mockData.length; i++) {
        let id = mockData[i].todoItemId;
        if (req.params.number == id) {
            res.status(200).send(mockData[i]);
        }      
    }
});

app.post('/api/TodoItems', function(req, res) {

    let obj = {
        todoItemId: counter,
        name: req.body.name,
        priority: req.body.priority,
        completed: req.body.completed
    }
    mockData.push(obj);
    counter++;

    res.status(201).send(obj);
});

app.delete('/api/TodoItems/:number', function(req, res) {

    let delObj = [];
    const delId = req.params.number;
    for(i = 0; i < mockData.length; i++) {
        if (delId == mockData[i].todoItemId) {
            delObj = mockData.splice(i, 1);
        }
    }
    res.status(200).send(delObj[0]);
});


module.exports = app;
