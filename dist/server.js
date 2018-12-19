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
    .verifyUser("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NDUyMjE4MzQsImV4cCI6MTU3Njc1NzgzNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImlkIjoiNDAiLCJTdXJuYW1lIjoiUm9ja2V0IiwiRW1haWwiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiUm9sZSI6WyJNYW5hZ2VyIiwiUHJvamVjdCBBZG1pbmlzdHJhdG9yIl19.kbT5CcY-O394AkfHL9Za6idl4PqYFbuLpWsO4ui29eY")
    .then(res => console.log(res))
    .catch(err => console.log(err));
// accountsFunctions
//   .loginUser(loginUser)
//   .then(res => console.log(res.id))
//   .catch(err => {
//     console.log(err);
//   });
// accountsFunctions
//   .createUser(createUser)
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => console.log(err));
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