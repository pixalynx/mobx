"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const statusController = require("./status");
const app = express();
console.log("hello world");
app.get("/", statusController.hi);
exports.default = app;
//# sourceMappingURL=app.js.map