let express = require("express");
let router = express.Router();
let {
  MaterialType,
  MachineType,
  SupplyType,
  WorkType,
  WorkforceType,
  TenderType,
  ClientType
} = require("../../models");
const camelcaseKeys = require("camelcase-keys");

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
      console.log(err);
      res.status(500).send({
        status: "fail",
        messages: ["Error servidor"]
      });
    });
}

router.post("/machines", (req, res, next) => {
  let {name} = req.body;
  let data = {name};
  return create(MachineType, data, res);
});

router.post("/materials", (req, res, next) => {
  let {name} = req.body;
  let data = {name};
  return create(MaterialType, data, res);
});

router.post("/supplies", (req, res, next) => {
  let {name} = req.body;
  let data = {name};
  return create(SupplyType, data, res);
});

router.post("/works", (req, res, next) => {
  let {name} = req.body;
  let data = {name};
  return create(WorkType, data, res);
});

router.post("/workForces", (req, res, next) => {
  let {name, salary} = req.body;
  let data = {name, salary};
  return create(WorkforceType, data, res);
});

router.post("/tenders", (req, res, next) => {
  let {name, type} = req.body;
  let data = {name, type};
  return create(TenderType, data, res);
});

router.post("/clients", (req, res, next) => {
  let {name} = req.body;
  let data = {name};
  return create(ClientType, data, res);
});

module.exports = router;
