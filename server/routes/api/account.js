const express = require("express");
const router = express.Router();
const settings = require("../../config");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const uuid4 = require("uuid/v4");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(settings.sqlConnection);

const {
  loginUser,
  createUser,
  userExists
} = require("../../controllers/accountController");

const {
  getUserClients
} = require("../../controllers/userClients/userClientsController");

const { ensureToken } = require("../../middleware/tokenVerify");

//Login users
router.post("/login", async (req, res) => {
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

//Signup users
router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    let checkUser = await userExists(req.body.username);
    let registerUser = await createUser(req.body);
    res.json({
      data: registerUser
    });
  } catch (err) {
    res.status(500).json({ data: err });
  }
});

router.get("/customers", ensureToken, async (req, res) => {
  try {
    let customers = await getUserClients(req.user.id);
    res.json({
      customers: customers
    });
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

module.exports = router;
