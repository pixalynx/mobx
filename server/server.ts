import express = require("express");
const app = express();
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import Sequelize = require("sequelize");
import settings from "./settings";
import * as accountsFunctions from "./functions/accountFunctions";
import { BaseUser } from "./functions/accountFunctions";

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

app.get("/test", (req: Request, res: Response) => {
  let ip: string = "lol";
  res.send(ip);
});

export default server;
