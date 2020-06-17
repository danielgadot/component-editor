const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3');
const db = require('./../db');

module.exports = {
  getToken (req, res) {
    console.log('req :: ', req.body);
    let users = [];
    // gety users from db
    db.executeSql(`SELECT * FROM users`, (dbUsers) => {
      let user;
      console.log('users :: ', dbUsers);
      user = dbUsers.filter((row) => row.username === req.body.username && row.password === req.body.password)
      console.log('user :: ', user);
      if (user[0]) {
        // send token
        jwt.sign({ user: user[0] }, 'secretkey', (err, token) => {
          res.send({
            token
          })
        })
      } else {
        res.status(403)
        res.send('fail login')
      }
    })
  }
};
