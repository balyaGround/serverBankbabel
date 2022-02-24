const { log } = require("../models");

class logController {
  logCtrl = async (req, res, next) => {
    try {
      let data = await log.create({
        editedBy: req.user.username,
        role: req.user.role,
      });

      next({
        value: req.body.data,
        message: "Created",
        statusCode: 201,
      });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new logController();
