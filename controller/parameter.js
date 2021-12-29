const { parameter } = require("../models");

class Parameter {
  async createParameter(req, res, next) {
    try {
      const id = "61cc89a9099d55a360b28735";
      const newData = await parameter.findOneAndUpdate({ _id: id }, req.body);

      let data = await parameter.findOne({ _id: id }).select("-_v");

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getParameter(req, res, next) {
    try {
      const data = await parameter.find().select("-__v");

      if (!data) {
        return next({ message: "No parameter found!", statusCode: 404 });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Parameter();
