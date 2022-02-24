const validator = require("validator");

class parameterValidator {
  updateParameterVldt = async (req, res, next) => {
    try {
      const errorMessages = [];

      const validate = ["background", "button", "box", "percentage"];

      validate.map((x) => {
        if (!req.body[x] || req.body[x] === "") {
          errorMessages.push(`${x} cannot be empty`);
        }
      });

      if (errorMessages.length > 0) {
        return next({
          message: errorMessages,
          error: "Bad request",
          statusCode: 400,
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };

  updateTitleVldt = async (req, res, next) => {
    try {
      const errorMessages = [];

      if (validator.isEmpty(`${req.body.title}`)) {
        errorMessages.push("title can't be empty");
      }

      if (errorMessages.length > 0) {
        return next({
          message: errorMessages,
          error: "Bad request",
          statusCode: 400,
        });
      }

      req.body = {
        title: req.body.title,
      };

      next();
    } catch (error) {
      next(error);
    }
  };

  updateScheduleAttrVldt = async (req, res, next) => {
    try {
      const errorMessages = [];

      if (!req.body.attributes) {
        errorMessages.push(`attributes is needed`);
      }

      if (Array.isArray(req.body.attributes) !== true) {
        errorMessages.push(`attributes must be array`);
      }

      if (errorMessages.length > 0) {
        return next({
          message: errorMessages,
          error: "Bad request",
          statusCode: 400,
        });
      }

      req.body = {
        attributes: req.body.attributes,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new parameterValidator();
