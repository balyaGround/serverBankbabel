const express = require("express");
const route = express.Router();

const { supervisor } = require("../../middlewares/auth");

const {
  getParameter,
  updateParameterCtrl,
} = require("../../controller/parameterController");

const { logCtrl } = require("../../controller/logsController");

const {
  updateParameterVldt,
  updateTitleVldt,
  updateScheduleAttrVldt,
} = require("../../middlewares/validator/parameterValidator");

route.get("/", getParameter);
route.post("/", supervisor, updateParameterVldt, updateParameterCtrl, logCtrl);
route.post("/title", supervisor, updateTitleVldt, updateParameterCtrl, logCtrl);
route.post(
  "/attributes",
  supervisor,
  updateScheduleAttrVldt,
  updateParameterCtrl,
  logCtrl
);

module.exports = route;
