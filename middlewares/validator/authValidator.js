const validator = require("validator");

class authValidator {
  signinVldt = (req, res, next) => {
    try {
      const errorMessages = [];

      const validate = ["username", "password"];

      validate.map((x) => {
        if (!req.body[x] || req.body[x] === "") {
          errorMessages.push(`${x} cannot be empty`);
        }
      });

      if (validator.isEmpty(`${req.body.username}`)) {
        errorMessages.push("username can't be empty");
      }
      if (validator.isEmpty(`${req.body.password}`)) {
        errorMessages.push("password can't be empty");
      }

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
}
module.exports = new authValidator();
