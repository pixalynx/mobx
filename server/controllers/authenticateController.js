const jwt = require("jsonwebtoken");

const Sequelize = require("sequelize");

const settings = require("../config");

const sequelize = new Sequelize(settings.sqlConnection);

function verifyUser(token) {
  return new Promise((resolve, reject) => {
    let verify = jwt.verify(token, "my_secret_key");
    sequelize.authenticate().then(() => {
      sequelize
        .query(`select * from accounts where id = ${verify.user.id}`, {
          type: sequelize.QueryTypes.SELECT
        })
        .then(user => {
          if (user.length > 0) {
            resolve(user[0]);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  });
}

module.exports.verifyUser = verifyUser;
