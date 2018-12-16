const express = require("express");
const settings = require("./config");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid/v4");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(settings.sqlConnection);

//our routes
const accountRoute = require("./routes/api/account");

const usar = verifyUser(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJVc2VybmFtZSI6IlBpeGFseW54IiwiUGFzc3dvcmQiOiIxMjMiLCJFbWFpbCI6IjEyMyIsInJlZ0NvZGUiOiIxMjMiLCJWZXJpZmllZCI6LTF9LCJpYXQiOjE1NDQ4ODk1MTZ9.gvlLy_va-kIcT2cGhDV4jCbNjr1-5U7aAImnwJ89VHw"
).then(res => {
  console.log(res.Username);
});

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

app.post("/api/login", async (req, res) => {
  try {
    let user = await loginUser(req.body.username, req.body.password);
    const token = jwt.sign({ user }, "my_secret_key");
    res.json({
      token: token
    });
  } catch (err) {
    res.status(404).json({ error: err.error });
  }
});

async function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    let verify = await verifyUser(bearerToken);
    req.user = verify.Username;
    next();
  } else {
    res.sendStatus(403);
  }
}

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

function loginUser(username, password) {
  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => {
        console.log("connected to db");
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

app.listen(5000);
