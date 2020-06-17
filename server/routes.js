const controllers = require('./contorllers/controllers');
const verifyToken = require('./verify-token');
const addHeaders = require('./add-headers');
const path = require('path');
const express = require('express');

// include all controllers
// add verifyToken
module.exports = function(app) {
    // app.use(express.static(__dirname + '/dist/angular-app'));
    app.use(express.static(path.join(__dirname, '/../client')))
    app.get('/', (req, res) => res.sendFile(path.join(__dirname, './../client/index.html')))
    //app.get('/', (req, res) => res.sendFile(path.join(__dirname, './index.html'))) // local html
    app.post('/login', controllers.loginCtrl.getToken);
    app.get('/userSettings/:id', controllers.usersSettingsCtrl.getSettings);
    app.post('/signup', controllers.usersCtrl.addUser);
    app.get('/users', verifyToken, controllers.usersCtrl.getUsers);
    app.get('/user/:id', verifyToken, controllers.usersCtrl.getUser);
    app.delete('/user/:id', verifyToken, controllers.usersCtrl.deleteUser);
    app.post('/user/:id', verifyToken, controllers.usersCtrl.updateUser);
    app.use(controllers.errCtrl.errOne)
    app.use(controllers.errCtrl.errTwo)
};


