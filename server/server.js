const express = require('express');
const app = express();
const port = 3000
const path = require('path');
const bodyParser = require('body-parser');
const commander = require('commander');
const inquirer = require('inquirer');
const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');

var cors = require('cors');
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
const routes = require('./routes')(app)

// app.use('/', express.static(path.join(__dirname, '../client')));
app.get('/',(req, res) => {
    res.cookie('name-key', 'daniel-value');
    res.send('<h1>get route</h1>');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))





