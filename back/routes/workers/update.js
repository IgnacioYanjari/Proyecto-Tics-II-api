let express = require("express");
let router = express.Router();
let {Worker} = require("../../models");
const camelcaseKeys = require("camelcase-keys");

async function verifyValues(values) {
  let res = await Object.keys(values).map(key => {
    if (values[key] == null) {
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
    finalDigit = rut[rut.length - 1];
    rut = rut.substring(0, rut.length - 1);
    rut = rut.match(/[0-9]/g);
    if (!rut) return null;
    rut = rut.join("");
    console.log(`antes ${rut}`);
    rut = rut + finalDigit;
    console.log(`despues ${rut}`);
    if (rut.length >= 7) return rut;
    return null;
  }
  return null;
}

function formatPhone(phone) {
  console.log(`phone before : ${phone}`);
  if (phone) {
    const len = phone.length;
    phone = phone.substring(len - 8, len);
    console.log(`phone after : ${phone}`);
    if (phone.length >= 8) return phone;
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

async function update(model, data, res) {
  if (!data.id) {
    return res.send({
      status: "fail",
      messages: ["Id es necesario para editar"]
    });
  }
  try {
    let worker = await Worker.findOne({
      where: {
        rut: data.rut
      }
    });
    if (worker) {
      if (worker.id != data.id)
        return res.status(401).send({
          status: "fail",
          message: "Rut ya existente"
        });
    }
  } catch (e) {
    return res.status(500).send({
      status: "fail",
      message: "Error servidor"
    });
  }

  return model
    .findByPk(data.id)
    .then(result => {
      data = cleanData(data);
      result
        .update(data)
        .then(result => {
          return res.send({
            status: "success",
            data: camelcaseKeys(result.dataValues)
          });
        })
        .catch(err => {
          console.log(err);
          res.status(401).send({
            status: "fail",
            message: err.errors[0].message
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        status: "fail",
        message: "Error servidor"
      });
    });
}

router.put("/:id", async (req, res, next) => {
  let {firstName: first_name, lastName: last_name, phone, rut} = req.body;
  let {id} = req.params;
  let data = {first_name, last_name, rut, phone, id};
  data = cleanData(data);
  if (data.rut) data.rut = formatRut(data.rut);
  if (data.phone) data.phone = formatPhone(data.phone);
  let verify = await verifyValues(data);
  if (verify.status === "fail") {
    return res.status(404).send({
      status: "fail",
      message: verify.message
    });
  }
  return update(Worker, data, res);
});

module.exports = router;
