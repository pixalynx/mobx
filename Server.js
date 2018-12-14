const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.get("/api", (req, res) => {
  res.json({
    text: "my api"
  });
});

app.get("/api/protected", ensureToken, (req, res) => {
  res.json({
    text: "this is protected"
  });
});

app.post("/api/login", (req, res) => {
  const user = { id: 3 };
  const token = jwt.sign({ user }, "my_secret_key");
  res.json({
    token: token
  });
});

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

app.listen(5000);