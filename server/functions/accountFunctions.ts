import Sequelize = require("sequelize");
import settings from "../settings";
const sequelize = new Sequelize(settings.sqlConnection);
import uuid4 = require("uuid/v4");
import bcrypt = require("bcrypt");
import { resolve } from "path";
import { reject } from "q";
const saltRounds: number = 10;

export interface BaseUser {
  id?: number;
  Username?: string;
  Password?: string;
  Email?: string;
  regCode?: string;
  Verfied?: boolean;
}

export async function loginUser(user: BaseUser) {
  return new Promise<BaseUser>((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => {
        sequelize
          .query(`select * from accounts where Username = '${user.Username}'`, {
            type: sequelize.QueryTypes.SELECT
          })
          .then(users => {
            if (users.length > 0) {
              bcrypt.compare(user.Password, users[0].Password).then(res => {
                if (res) {
                  resolve(users[0]);
                }
              });
            } else {
              reject({ error: "No user found" });
            }
          });
      })
      .catch(err => {
        reject(err);
      });
  });
}

export async function createUser(user: BaseUser) {
  return new Promise(async (resolve, reject) => {
    let checkUser = await userExists(user);
    if (checkUser) {
      reject({ error: "user already exists" });
    } else {
      bcrypt.hash(user.Password, saltRounds).then(hash => {
        sequelize
          .authenticate()
          .then(() => {
            sequelize
              .query(
                `insert into accounts (Username,Password,Email,regCode) values('${
                  user.Username
                }','${hash}','${user.Email}','${uuid4()}')`,
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
            reject(err);
          });
      });
    }
  });
}

export async function userExists(user: BaseUser) {
  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => {
        sequelize
          .query(
            `select * from accounts where Username = '${
              user.Username
            }' or Email = '${user.Email}'`,
            {
              type: sequelize.QueryTypes.SELECT
            }
          )
          .then(users => {
            if (users.length > 0) {
              resolve(true);
            }
            // console.log(users);
            else {
              resolve(false);
            }
          });
      })
      .catch(err => {
        console.log("Error :" + err);
        reject(err);
      });
  });
}
