const sqlite3 = require('sqlite3').verbose();

exports.executeSql = (sql, callback) => {
  console.log('%c sql :: ', 'color: red;font-size:16px', sql);
  // open the database
  let db = new sqlite3.Database('./database/mydb.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the USERS database');
  });
  db.all(sql, (err, res) => {
    callback(res);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}
