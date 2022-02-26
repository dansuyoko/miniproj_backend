const db = require('../../config/db');
let Validator = require('validatorjs');

function insertMerchant(req, res) {
  let data = req.body;
  let rules = {
    name: 'required|min:3|max:50',
    password: 'required|min:1',
    address: 'required',
    join_date: 'required',
    phone_number: 'required',
  };
  let validation = new Validator(data, rules);
  let insertQuery = `INSERT INTO merchant SET ?;`;

  if (validation.passes()) {
    db.query(insertQuery, data, function (error, results, fields) {
      if (error) throw error;
    });
    res.send({ message: 'Data has been inserted', data: data });
  } else {
    res.send({ message: 'Error on: ', data: validation.errors.all() });
  }
}

function listMerchant(req, res) {
  let selectQuery = `SELECT * FROM merchant`;

  db.query(selectQuery, function (error, results, fields) {
    if (error) throw error;
    res.send({ message: 'Data is found', data: results });
  });
}

function listMerchantActive(req, res) {
  let selectQuery = `SELECT * FROM merchant WHERE isDeleted = false`;

  db.query(selectQuery, function (error, results, fields) {
    if (error) throw error;
    res.send({ message: 'Data is found', data: results });
  });
}

function updateMerchant(req, res) {
  let updateQuery = `UPDATE merchant SET ? WHERE id = ?`;
  let data = [req.body, req.params.id];
  let rules = {
    name: 'min:3|max:50',
    password: 'min:1',
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

function deleteMerchant(req, res) {
  let deleteQuery = `DELETE FROM merchant WHERE id = ?`;
  let data = [req.params.id];
  db.query(deleteQuery, data, function (err, deleted) {
    if (err) throw err;
  });

  res.send({ message: 'Data has been deleted' });
}

module.exports = {
  insertMerchant,
  listMerchantActive,
  listMerchant,
  updateMerchant,
  deleteMerchant,
};
