const Sequelize = require("sequelize");

const settings = require("../config");

const sequelize = new Sequelize(settings.sqlConnection);

const uuid4 = require("uuid/v4");

const bcrypt = require("bcrypt");
const saltRounds = 10;

function loginUser(username, password) {
  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => {
        sequelize
          .query(
            `select * from accounts where Username = '${username}' and Password = '${password}'`,
            {
              type: sequelize.QueryTypes.SELECT
            }
          )
          .then(users => {
            if (users.length > 0) {
              resolve(users[0]);
            }
            // console.log(users);
            else {
              reject({ error: "No user found" });
            }
          });
      })
      .catch(err => {
        console.log("Error :" + err);
        reject(err);
      });
  });
}

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

module.exports.loginUser = loginUser;
module.exports.createUser = createUser;
module.exports.userExists = userExists;
