const Sequelize = require("sequelize");

const settings = require("../../config");

const sequelize = new Sequelize(settings.sqlConnection);

function getUserClients(id) {
  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => {
        sequelize
          .query(`select * from customers where userId = ${id}`, {
            type: sequelize.QueryTypes.SELECT
          })
          .then(customers => {
            if (customers.length > 0) {
              console.log(customers);
              resolve(customers);
            } else {
              reject({ error: "no customers available" });
            }
          });
      })
      .catch(err => {
        console.log("Error :" + err);
        reject(err);
      });
  });
}

module.exports.getUserClients = getUserClients;
