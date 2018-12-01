let express = require("express");
let router = express.Router();
let {Worker} = require("../../models");
const camelcaseKeys = require("camelcase-keys");

async function verifyValues(values) {
  let res = await Object.keys(values).map(key => {
    if (values[key] == null && key != "phone") {
      return {
        status: "fail",
        message: `formato incorrecto de ${key}`
      };
    } else {
      return {
        status: "success"
      };
    }
  });
  res = res.find(val => val.status === "fail");
  if (res) return res;
  else return {status: "success"};
}

function formatRut(rut) {
  if (rut) {
    rut = rut.match(/[0-9]/g);
    rut = rut.join("");
    if (rut.length != 0) return rut;
    return null;
  }
  return null;
}

function cleanData(data) {
  for (var i in data) {
    if (data[i] === null || typeof data[i] === "undefined") {
      delete data[i];
    } else if (typeof data[i] === "object") {
      cleanData(data[i]);
    }
  }
  return data;
}

function formatPhone(phone) {
  if (phone) {
    const len = phone.length;
    phone = phone.substring(len - 8, len);
    if (phone.length >= 8) return phone;
    return null;
  }
  return null;
}

async function create(model, data, res) {
  return model
    .create(data)
    .then(result => {
      return res.send({
        status: "success",
        data: camelcaseKeys(result.dataValues)
      });
    })
    .catch(err => {
      res.status(500).send({
        status: "fail",
        message: err.errors[0].message
      });
    });
}

router.post("", async (req, res, next) => {
  let {firstName: first_name, lastName: last_name, rut, phone} = req.body;
  let data = {first_name, last_name, rut, phone};
  let verify = await verifyValues(data);
  if (verify.status === "fail") {
    return res.send({
      status: "fail",
      message: verify.message
    });
  }
  return create(Worker, data, res);
});

module.exports = router;
