"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const settings_1 = require("./settings");
const accountsFunctions = require("./functions/accountFunctions");
const sequelize = new Sequelize(settings_1.default.sqlConnection);
let loginUser = {
    Username: "Pixalynx212",
    Password: "123"
};
let createUser = {
    Username: "Pixalynx21",
    Password: "123",
    Email: "pixalynx@gmail.com"
};
accountsFunctions
    .loginUser(loginUser)
    .then(res => console.log(res.id))
    .catch(err => {
    console.log(err);
});
accountsFunctions
    .createUser(createUser)
    .then(res => {
    console.log(res);
})
    .catch(err => console.log(err));
app.use(bodyParser.json());
const server = app.listen(5000, () => {
    console.log("app running");
});
app.get("/test", (req, res) => {
    let ip = "lol";
    res.send(ip);
});
exports.default = server;
//# sourceMappingURL=server.js.map