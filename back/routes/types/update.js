let express = require("express");
let router = express.Router();
let {
  MachineType,
  MaterialType,
  SupplyType,
  ClientType,
  TenderType,
  WorkType,
  WorkforceType
} = require("../../models");
const camelcaseKeys = require("camelcase-keys");

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
  console.log(JSON.stringify(data, null, 3));
  if (!data.id) {
    return res.send({
      status: "fail",
      messages: ["Id es necesario para editar"]
    });
  }
  return model
    .findById(data.id)
    .then(result => {
      delete data.id;
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
          res.status(500).send({
            status: "fail",
            messages: ["Error servidor"]
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        status: "fail",
        messages: ["Error servidor"]
      });
    });
}

router.put("/machines/:id", (req, res, next) => {
  let {name} = req.body;
  let {id} = req.params;
  let data = {name, id};
  return update(MachineType, data, res);
});

router.put("/materials/:id", (req, res, next) => {
  let {name} = req.body;
  let {id} = req.params;
  let data = {name, id};
  return update(MaterialType, data, res);
});

router.put("/supplies/:id", (req, res, next) => {
  let {name, price} = req.body;
  let {id} = req.params;
  let data = {name, id};
  return update(SupplyType, data, res);
});

router.put("/workForces/:id", (req, res, next) => {
  let {name, salary} = req.body;
  let {id} = req.params;
  let data = {name, salary, id};
  return update(WorkforceType, data, res);
});

router.put("/works/:id", (req, res, next) => {
  let {name} = req.body;
  let {id} = req.params;
  let data = {name, id};
  return update(WorkType, data, res);
});

router.put("/tenders/:id", (req, res, next) => {
  let {name} = req.body;
  let {id} = req.params;
  let data = {name, id};
  return update(TenderType, data, res);
});

router.put("/clients/:id", (req, res, next) => {
  let {name} = req.body;
  let {id} = req.params;
  let data = {name, id};
  return update(ClientType, data, res);
});

module.exports = router;
