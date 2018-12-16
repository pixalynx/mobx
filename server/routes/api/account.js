const express = require("express");
const router = express.Router();
const settings = require("../../config");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const uuid4 = require("uuid/v4");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(settings.sqlConnection);

//Signup users
router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    let checkUser = await userExists(req.body.username);
    let registerUser = await createUser(req.body);
    res.json({
      data: registerUser
    });
  } catch (err) {
    res.status(500).json({ data: err });
  }
});

function createUser(account) {
  return new Promise((resolve, reject) => {
    let hashedPass;
    bcrypt.hash(account.password, saltRounds).then(hash => {
      sequelize
        .authenticate()
        .then(() => {
          sequelize
            .query(
              `insert into accounts (Username,Password,Email,regCode) values ('${
                account.username
              }','${hash}','${account.email}','${uuid4()}')`,
              { type: sequelize.QueryTypes.INSERT }
            )
            .then(result => {
              if (result) {
                resolve({ msg: "user created" });
              } else {
                reject({ msg: "failed to create user" });
              }
            });
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  });
}

function userExists(username) {
  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => {
        sequelize
          .query(`select * from accounts where Username = '${username}'`, {
            type: sequelize.QueryTypes.SELECT
          })
          .then(users => {
            if (users.length > 0) {
              reject({ msg: "user already exists" });
            }
            // console.log(users);
            else {
              resolve(true);
            }
          });
      })
      .catch(err => {
        console.log("Error :" + err);
        reject(err);
      });
  });
}

module.exports = router;
