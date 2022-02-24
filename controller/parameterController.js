const { parameter } = require("../models");

class Parameter {
  updateParameterCtrl = async (req, res, next) => {
    try {
      const id = "62173d59703d5a648911c254";
      const newData = await parameter.findOneAndUpdate({ _id: id }, req.body);

      let data = await parameter.findOne({ _id: id }).select("-_v");

      req.body.data = data;

      next();
    } catch (error) {
      next(error);
    }
  };

  getParameter = async (req, res, next) => {
    try {
      const data = await parameter.find().select("-__v");

      if (!data) {
        return next({
          value: "",
          message: "Not Found",
          statusCode: 404,
        });
      }

      next({
        value: data,
        message: "OK",
        statusCode: 201,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new Parameter();
