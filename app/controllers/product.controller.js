const db = require('../../config/db');
let Validator = require('validatorjs');

function insertProduct(req, res) {
  let data = req.body;
  let rules = {
    name: 'required|min:3|max:50',
    quantity: 'required|min:1',
    price: 'required|min:10000',
  };
  let validation = new Validator(data, rules);
  let insertQuery = `INSERT INTO product SET ?`;

  if (validation.passes()) {
    db.query(insertQuery, data, function (error, results, fields) {
      if (error) throw error;
    });
    res.send({ message: 'Data has been inserted', data: data });
  } else {
    res.send({ message: 'Error on: ', data: validation.errors.all() });
  }
}

function listProduct(req, res) {
  let selectQuery = `SELECT * FROM product`;

  db.query(selectQuery, function (error, results, fields) {
    if (error) throw error;
    res.send({ message: 'Data is found', data: results });
  });
}

function listProductActive(req, res) {
  let selectQuery = `SELECT * FROM product WHERE isDeleted = false`;

  db.query(selectQuery, function (error, results, fields) {
    if (error) throw error;
    res.send({ message: 'Data is found', data: results });
  });
}

function updateProduct(req, res) {
  let updateQuery = `UPDATE product SET ? WHERE id = ?`;
  let data = [req.body, req.params.id];
  let rules = {
    name: 'min:3|max:50',
    quantity: 'min:1',
    price: 'min:10000'
  };
  let validation = new Validator(req.body, rules);
  if (validation.passes()) {
    db.query(updateQuery, data, function (error, result, fields) {
      if (error) throw error;
    });

    res.send({ message: 'Data has been updated', data: data });
  } else {
    res.send({ message: 'Error on: ', data: validation.errors.all() });
  }
}

function deleteProduct(req, res) {
  let deleteQuery = `DELETE FROM product WHERE id = ?`;
  let data = [req.params.id];
  db.query(deleteQuery, data, function (err, deleted) {
    if (err) throw err;
  });

  res.send({ message: 'Data has been deleted' });
}

module.exports = {
  insertProduct,
  listProduct,
  listProductActive,
  updateProduct,
  deleteProduct,
};
