const db = require('../../config/db');

// let createQuery = `CREATE TABLE IF NOT EXISTS product (
//     id INT NOT NULL AUTO_INCREMENT,
//     name VARCHAR(50) DEFAULT NULL,
//     quantity INT(10) DEFAULT NULL,
//     price INT(50) DEFAULT NULL,
//     createAt DATETIME DEFAULT TIMESTAMP(),
//     PRIMARY KEY (id)
// );
// `;

// db.query(createQuery, function (error, results, fields) {
//   if (error) throw error;
//   console.log('Table has been created');
// });

let createQuery1 = `CREATE TABLE IF NOT EXISTS merchant (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) DEFAULT NULL,
    password VARCHAR(50) DEFAULT NULL,
    address VARCHAR(100) DEFAULT NULL,
    join_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    phone_number INT(15) NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt DATETIME DEFAULT NULL,
    deletedAt DATETIME DEFAULT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    idProduct INT NULL,
    PRIMARY KEY (id),
    foreign key (idProduct) references merchant(id)
)COLLATE='utf8mb4_general_ci'
;
`;

db.query(createQuery1, function (error, results, fields) {
  if (error) throw error;
  console.log('Table has been created');
});
