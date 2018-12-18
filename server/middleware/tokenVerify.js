const { verifyUser } = require("../controllers/authenticateController.js");

async function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    let verify = await verifyUser(bearerToken);
    req.user = verify;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports.ensureToken = ensureToken;
