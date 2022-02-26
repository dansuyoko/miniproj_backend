const db = require('../../config/db');

let updateQuery = `UPDATE product SET name = ? WHERE id = ?`;
let data = ['flashdisk 16 GB', 1];
db.query(updateQuery, data, function (err, updated) {
  if (err) throw err;
  console.log(updated);
});
