var mysql = require('mysql');
var connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mystore',
});

module.exports = connect;
