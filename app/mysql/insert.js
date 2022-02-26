const db = require('../../config/db');

// let data = [
//   { name: 'flashdisk 32 GB', quantity: '10', price: 120000 },
//   { name: 'ssd 512 GB', quantity: '15', price: 750000 },
//   { name: 'headset', quantity: '14', price: 250000 },
//   { name: 'mouse', quantity: '7', price: 60000 },
// ];

// data.forEach((value) => {
//   let insertQuery = `INSERT INTO product SET ?;`;
//   db.query(insertQuery, value, function (error, results, fields) {
//     if (error) throw error;
//     console.log('Data has been inserted');
//   });
// });

let data1 = [
  { name: 'rudi', password: 111111, address: 'Jl. A no 3, Jakbar', phone_number: 08122223333 },
  { name: 'andi', password: 222222, address: 'Jl. B no 4, Surakarta', phone_number: 08122555555 },
  { name: 'budi', password: 333333, address: 'Jl. NN no 10, Medan', phone_number: 08178888888 },
];

data1.forEach((value) => {
  let insertQuery1 = `INSERT INTO merchant SET ?;`;
  db.query(insertQuery1, value, function (error, results, fields) {
    if (error) throw error;
    console.log('Data has been inserted');
  });
});
