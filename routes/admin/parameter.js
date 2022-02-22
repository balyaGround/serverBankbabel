const express = require("express");
const route = express.Router();

const { getParameter, createParameter } = require("../../controller/parameter");

route.get("/", getParameter);
route.post("/", createParameter);

module.exports = route;
