const express = require("express");
const settings = require("./config");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid/v4");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(settings.sqlConnection);

const {
  verifyUser
} = require("../server/controllers/authenticateController.js");

const { loginUser } = require("./controllers/accountController");

const { ensureToken } = require("./middleware/tokenVerify");
//our routes
const accountRoute = require("./routes/api/account");

const usar = verifyUser(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJVc2VybmFtZSI6IlBpeGFseW54IiwiUGFzc3dvcmQiOiIxMjMiLCJFbWFpbCI6IjEyMyIsInJlZ0NvZGUiOiIxMjMiLCJWZXJpZmllZCI6LTF9LCJpYXQiOjE1NDUwNTQ3OTN9.2QS-WtZjKF3utFY3muVyJHhazPMZQifmsQPdO3VDXkk"
)
  .then(res => {
    console.log(res);
  })
  .catch(console.log("could not verify user"));

app.use(bodyParser.json());
app.use("/api", accountRoute);

app.get("/api", (req, res) => {
  res.json({
    text: "my api"
  });
});

app.get("/api/protected", ensureToken, (req, res) => {
  res.json({
    text: "this is protected",
    user: req.user
  });
});

app.listen(5000);
