import express = require("express");

import * as statusController from "./status";

const app = express();

console.log("hello world");

app.get("/", statusController.hi);

export default app;
