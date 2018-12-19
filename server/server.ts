import express = require("express");
const app = express();
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import Sequelize = require("sequelize");
import settings from "./settings";
import * as accountsFunctions from "./functions/accountFunctions";
import { BaseUser } from "./models/userModel";

const sequelize = new Sequelize(settings.sqlConnection);

let loginUser: BaseUser = {
  Username: "Pixalynx212",
  Password: "123"
};

let createUser: BaseUser = {
  Username: "Pixalynx21",
  Password: "123",
  Email: "pixalynx@gmail.com"
};

accountsFunctions
  .verifyUser(
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NDUyMjE4MzQsImV4cCI6MTU3Njc1NzgzNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImlkIjoiNDAiLCJTdXJuYW1lIjoiUm9ja2V0IiwiRW1haWwiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiUm9sZSI6WyJNYW5hZ2VyIiwiUHJvamVjdCBBZG1pbmlzdHJhdG9yIl19.kbT5CcY-O394AkfHL9Za6idl4PqYFbuLpWsO4ui29eY"
  )
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

app.get("/test", (req: Request, res: Response) => {
  let ip: string = "lol";
  res.send(ip);
});

export default server;
