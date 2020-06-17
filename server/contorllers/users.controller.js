const jwt = require('jsonwebtoken');
const db = require('./../db');
const fs = require('fs');
const path = require('path');

module.exports = {
  // add User
  addUser (req, res) {
    const illegalChars = /\W/; //only numbers and alphabets
    // validate username
    if (!req.query.username || req.query.username === '') {
      res.send('username empty');
      return;
    }
    if (illegalChars.test(req.query.username)) {
      res.send('Please enter valid Username. Use only numbers and alphabets');
      return;
    }
    if (!req.query.password || req.query.password === '') {
      res.send('password empty')
      return;
    }
    if (illegalChars.test(req.query.password)) {
      res.send('Please enter valid password. Use only numbers and alphabets');
      return;
    }
    // get users from db
    db.executeSql('SELECT * FROM users', (users) => {
      let user = users.filter((row) => row.username === req.query.username)
      if (user[0]) {
        res.send('user already exists');
      } else {
        let newUser =
          {
            id: users.length + 1,
            username: req.query.username,
            password: req.query.password
          };
        db.executeSql(`INSERT INTO users (id, username, password) VALUES (${newUser.id}, '${newUser.username}', '${newUser.password}')`,() => {
          res.json({
            msg: `user added`,
            newUser
          });
          res.end();
        })
      }
    })
  },
  // delete user
  deleteUser(req, res) {
    console.log('%c req.params :: ', 'color: red;font-size:16px', req.params);
    db.executeSql(`DELETE FROM users WHERE id=${req.params.id}`,(user) => {
      res.json({
        msg: `deleted user with id = ${req.params.id}`,
      });
      res.end();
    });
  },
  // updateUser
  updateUser(req, res) {
    // console.log('%c req.body :: ', 'color: red;font-size:16px', req.body);
    // console.log('%c req.query :: ', 'color: red;font-size:16px', req.query);
    // console.log('%c req.params :: ', 'color: red;font-size:16px', req.params);
    let userData = {
      id: parseInt(req.params.id),
      username: req.query.username
    }
    db.executeSql(`UPDATE users SET username='${userData.username}' WHERE id=${userData.id}`,(user) => {
      res.json({
        msg: `updated user with id = ${userData.id}`,
      });
      res.end();
    });
  },

  // getUsers
  getUsers(req, res) {
    db.executeSql('SELECT * FROM users',(users) => {
      res.json(users);
      res.end();
    });
  },

  // get user
  getUser(req, res) {
    db.executeSql(`SELECT * FROM users WHERE id=${req.params.id}`,(user) => {
      res.json(user);
      res.end();
    });
  },
};
