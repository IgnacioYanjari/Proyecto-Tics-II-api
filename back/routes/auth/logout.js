let jwt = require("jsonwebtoken");
let models = require("./../../models");
let bcrypt = require("bcrypt");

function LogOutFunction(req, res, next) {
  res.send({
    status: "success",
    messages: ["Deslogeado completamente"]
  });
}

module.exports = LogOutFunction;
