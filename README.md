#

## **1. Setup MySQL Database**

- Activate MySQL server, then create a **_mystore_** database with a **_merchant_** table and a **_product_** table:

  ```bash
  $ create database mystore;

  $ use mystore;

  $ CREATE TABLE merchant (
      id int(11) NOT NULL,
      name varchar(50) DEFAULT NULL,
      password varchar(50) DEFAULT NULL,
      address varchar(100) DEFAULT NULL,
      join_date datetime DEFAULT NULL,
      phone_number varchar(15) DEFAULT NULL,
      createdAt datetime NOT NULL DEFAULT current_timestamp(),
      updatedAt datetime DEFAULT NULL,
      deletedAt datetime DEFAULT NULL,
      isDeleted tinyint(1) NOT NULL DEFAULT 0,
      idProduct int(11) DEFAULT NULL,
      PRIMARY KEY (id),
      foreign key (idProduct) references product(id)
      )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  $ CREATE TABLE product (
      id int(11) NOT NULL,
      name varchar(50) DEFAULT NULL,
      quantity int(10) DEFAULT NULL,
      price int(50) DEFAULT NULL,
      createdAt datetime DEFAULT current_timestamp(),
      updatedAt datetime DEFAULT NULL,
      deletedAt datetime DEFAULT NULL,
      isDeleted tinyint(1) NOT NULL DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  ```

- Insert some data, as initial data, into **_merchant_** table:

  ```bash
  $ insert into merchant values
      ( 'rudi', 111111, 'Jl. A no 3, Jakbar', 08122223333 ),
      ('andi', 222222, 'Jl. B no 4, Surakarta', 08122555555 ),
      ( 'budi', 333333, 'Jl. NN no 10, Medan',  08178888888 )

  $ select * from merchant;


  ```

- Insert some data, as initial data, into **_product_** table:

  ```bash
  $ insert into product values
      (1, 'Flashdik 16 GB', 10, 120000, '2022-02-23 23:28:24', NULL, NULL, 0),
      (2, 'ssd 512 GB', 15, 750000, '2022-02-23 23:28:24', NULL, NULL, 0),
      (3, 'headset', 14, 250000, '2022-02-23 23:28:24', NULL, NULL, 0),
      (4, 'mouse', 7, 60000, '2022-02-23 23:28:24', NULL, NULL, 0),
      (6, 'ram 4 GB', 12, 400000, '2022-02-23 23:39:03', NULL, NULL, 0);

  $ select * from product;
  ```

- **Done!**

#

## **2. Setup Node.js Backend Project**

- Open **_app.js_** & edit these lines to configure your database:

  ```javascript
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_database_user',
    password: 'your_database_password',
    database: 'your_database_(mystore)',
  });
  ```

- Save it, then run your backend project. It will run at **_localhost:3000_**:

  ```bash
  $ node app
  ```

- **Done!**

#

## **3. API Usage**

- API in this project is divided into 2 groups namely _merchant_ and _product_. How to access the API is as follows:

### **1. Merchant**

##### **1. User Login with merchant ( POST /login )**

_Parameters_ : body

- name **(required, min: 3, max: 50)**
- password **(required, min: 6)**

_Result_ : JSON

- status : 400 _Login failed_

  ```bash
  {
  "massage": "Data not found",
  "data": []
  }
  ```

- status : 400 _Login success_
  ```bash
  {
  "massage": "Data is found",
      "data": {
          "token": token
          }
  }
  ```

##### **2. Get All Merchant ( GET /merchant )**

_Parameters_ : body

- password **(required, min: 6)**
- name **(required, min: 3, max 50)**
- address **(required)**
- join_date **(required, date)**
- phone_number **(required, numeric)**
- createdAt DEFAULT **current_timestamp()**

Authorization: _Bearer Token_

- token from login response \*required

_Result_ : JSON

- status : 401 _Failed to get data when token isn't input_

  ```bash
  {
      "message": "Unauthorized"
  }
  ```

- status : 401 _Failed to get data when token invalid_

  ```bash
  {
      "message": "Invalid Token"
  }
  ```

- status : 200 _Successed to get data merchant_
  ```bash
  {
      "message": "Data is found"
  }
  ```

##### **3. Get Merchant Active ( GET /merchant )**

_Parameters_ : body

- password **(required, min: 6)**
- name **(required, min: 3, max 50)**
- address **(required)**
- join_date **(required, date)**
- phone_number **(required, numeric)**
- createdAt DEFAULT **current_timestamp()**
- isDeleted **false**

Authorization: Bearer Token

- token from login response \*required

_Result_ : JSON

- status : 401 _Failed to get data when token isn't input_

  ```bash
  {
      "message": "Unauthorized"
  }
  ```

- status : 401 _Failed to get data when token invalid_

  ```bash
  {
      "message": "Invalid Token"
  }
  ```

- status : 200 _Successed to get data merchant_
  ```bash
  {
      "message": "Data is found"
  }
  ```

##### **4. Insert merchant ( POST /merchant )**

Authorization: Bearer Token

- token from login response \*required

_Result_ : JSON

- status : 401 _Failed to insert data when token isn't input_

  ```bash
  {
      "message": "Unauthorized"
  }
  ```

- status : 401 _Failed to insert data when token invalid_

  ```bash
  {
      "message": "Invalid Token"
  }
  ```

- status : 200 _Successed to insert data merchant_
  ```bash
  {
      "message": "Data has been inserted"
  }
  ```

##### **5. Update merchant ( PUT /merchant/id )**

Authorization: Bearer Token

- token from login response \*required

_Result_ : JSON

- status : 401 _Failed to update data when token isn't input_

  ```bash
  {
      "message": "Unauthorized"
  }
  ```

- status : 401 _Failed to update data when token invalid_

  ```bash
  {
      "message": "Invalid Token"
  }
  ```

- status : 200 _Successed to update data merchant_
  ```bash
  {
      "message": "Data has been updated"
  }
  ```

##### **6. Delete merchant ( DEL /merchant/id )**

Authorization: Bearer Token

- token from login response \*required

_Result_ : JSON

- status : 401 _Failed to delete data when token isn't input_

  ```bash
  {
      "message": "Unauthorized"
  }
  ```

- status : 401 _Failed to delete data when token invalid_

  ```bash
  {
      "message": "Invalid Token"
  }
  ```

- status : 200 _Successed to delete data merchant_
  ```bash
  {
      "message": "Data has been deleted"
  }
  ```

##### **5. SOFT Delete merchant ( PUT /merchant/id )**

Authorization: Bearer Token

- token from login response \*required

_Parameters_ : body

    {
        "isDeleted": true,
        "deletedAt":"{{currentdate}}"
    }

_Result_ : JSON

- status : 401 _Failed to soft delete data when token isn't input_

  ```bash
  {
      "message": "Unauthorized"
  }
  ```

- status : 401 _Failed to soft delete data when token invalid_

  ```bash
  {
      "message": "Invalid Token"
  }
  ```

- status : 200 _Successed to soft delete data merchant_
  ```bash
  {
      "message": "Data has been updated"
  }
  ```

### **1. Product**

##### **1. User Login with product ( POST /login )**

_Parameters_ : body

- name **(required, min: 3, max: 50)**
- password **(required, min: 6)**

_Result_ : JSON

- status : 400 _Login failed_

  ```bash
  {
  "massage": "Data not found",
  "data": []
  }
  ```

- status : 400 _Login success_
  ```bash
  {
  "massage": "Data is found",
      "data": {
          "token": token
          }
  }
  ```

##### **2. Get All Product ( GET /product )**

_Parameters_ : body

- password **(required, min: 6)**
- name **(required, min: 3, max 50)**
- address **(required)**
- join_date **(required, date)**
- phone_number **(required, numeric)**
- createdAt DEFAULT **current_timestamp()**

Authorization: Bearer Token

- token from login response **required**

_Result_ : JSON

- status : 401 _Failed to get data when token isn't input_

  ```bash
  {
      "message": "Unauthorized"
  }
  ```

- status : 401 _Failed to get data when token invalid_

  ```bash
  {
      "message": "Invalid Token"
  }
  ```

- status : 200 _Successed to get data product_
  ```bash
  {
      "message": "Data is found"
  }
  ```

##### **3. Get Product Active ( GET /merchant )**

_Parameters_ : body

- password **(required, min: 6)**
- name **(required, min: 3, max 50)**
- address **(required)**
- join_date **(required, date)**
- phone_number **(required, numeric)**
- createdAt DEFAULT **current_timestamp()**
- isDeleted **false**

Authorization: Bearer Token

- token from login response **required**

_Result_ : JSON

- status : 401 _Failed to get data when token isn't input_

  ```bash
  {
      "message": "Unauthorized"
  }
  ```

- status : 401 _Failed to get data when token invalid_

  ```bash
  {
      "message": "Invalid Token"
  }
  ```

- status : 200 _Successed to get data merchant_
  ```bash
  {
      "message": "Data is found"
  }
  ```

##### **4. Insert merchant ( POST /merchant )**

Authorization: Bearer Token

- token from login response \*required

_Result_ : JSON

- status : 401 _Failed to insert data when token isn't input_

  ```bash
  {
      "message": "Unauthorized"
  }
  ```

- status : 401 _Failed to insert data when token invalid_

  ```bash
  {
      "message": "Invalid Token"
  }
  ```

- status : 200 _Successed to insert data merchant_
  ```bash
  {
      "message": "Data has been inserted"
  }
  ```

##### **5. Update merchant ( PUT /merchant/id )**

Authorization: Bearer Token

- token from login response \*required

_Result_ : JSON

- status : 401 _Failed to update data when token isn't input_

  ```bash
  {
      "message": "Unauthorized"
  }
  ```

- status : 401 _Failed to update data when token invalid_

  ```bash
  {
      "message": "Invalid Token"
  }
  ```

- status : 200 _Successed to update data merchant_
  ```bash
  {
      "message": "Data has been updated"
  }
  ```

##### **6. Delete merchant ( DEL /merchant/id )**

Authorization: Bearer Token

- token from login response \*required

_Result_ : JSON

- status : 401 _Failed to delete data when token isn't input_

  ```bash
  {
      "message": "Unauthorized"
  }
  ```

- status : 401 _Failed to delete data when token invalid_

  ```bash
  {
      "message": "Invalid Token"
  }
  ```

- status : 200 _Successed to delete data merchant_
  ```bash
  {
      "message": "Data has been deleted"
  }
  ```

##### **5. SOFT Delete merchant ( PUT /merchant/id )**

Authorization: Bearer Token

- token from login response \*required

_Parameters_ : body

    {
        "isDeleted": true,
        "deletedAt":"{{currentdate}}"
    }

_Result_ : JSON

- status : 401 _Failed to soft delete data when token isn't input_

  ```bash
  {
      "message": "Unauthorized"
  }
  ```

- status : 401 _Failed to soft delete data when token invalid_

  ```bash
  {
      "message": "Invalid Token"
  }
  ```

- status : 200 _Successed to soft delete data merchant_

  ```bash
  {
      "message": "Data has been updated"
  }
  ```

- It will run at **_localhost:3000_** & open in browser automatically! **Done!**

#

#### Danang Suyoko

:loveletter: dsuyoko@yahoo.com
:octocat: [GitHub](https://github.com/dansuyoko) |
