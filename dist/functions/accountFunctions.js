"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const settings_1 = require("../settings");
const sequelize = new Sequelize(settings_1.default.sqlConnection);
const uuid4 = require("uuid/v4");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
function loginUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
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
                    }
                    else {
                        reject({ error: "No user found" });
                    }
                });
            })
                .catch(err => {
                reject(err);
            });
        });
    });
}
exports.loginUser = loginUser;
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let checkUser = yield userExists(user);
            if (checkUser) {
                reject({ error: "user already exists" });
            }
            else {
                bcrypt.hash(user.Password, saltRounds).then(hash => {
                    sequelize
                        .authenticate()
                        .then(() => {
                        sequelize
                            .query(`insert into accounts (Username,Password,Email,regCode) values('${user.Username}','${hash}','${user.Email}','${uuid4()}')`, { type: sequelize.QueryTypes.INSERT })
                            .then(result => {
                            if (result) {
                                resolve({ msg: "user created" });
                            }
                            else {
                                reject({ msg: "failed to create user" });
                            }
                        });
                    })
                        .catch(err => {
                        reject(err);
                    });
                });
            }
        }));
    });
}
exports.createUser = createUser;
function userExists(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            sequelize
                .authenticate()
                .then(() => {
                sequelize
                    .query(`select * from accounts where Username = '${user.Username}' or Email = '${user.Email}'`, {
                    type: sequelize.QueryTypes.SELECT
                })
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
    });
}
exports.userExists = userExists;
function verifyUser(token) {
    return new Promise((resolve, reject) => {
        let verify = jwt.verify(token, settings_1.default.jwtSecret);
        sequelize.authenticate().then(() => {
            sequelize
                .query(`select * from accounts where id = ${verify.id}`, {
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
exports.verifyUser = verifyUser;
//# sourceMappingURL=accountFunctions.js.map