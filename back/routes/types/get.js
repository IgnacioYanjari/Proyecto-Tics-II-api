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

function getAll(model, res) {
  return model
    .findAll({
      attributes: {
        exclude: ["updated_at", "deleted_at"]
      }
    })
    .then(data => {
      let response = [];
      data.map(value => response.push(camelcaseKeys(value.get())));
      return res.send({
        status: "success",
        data: camelcaseKeys(response)
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

router.get("/materials", (req, res, next) => {
  return getAll(MaterialType, res);
});

router.get("/machines", (req, res, next) => {
  return getAll(MachineType, res);
});

router.get("/supplies", (req, res, next) => {
  return getAll(SupplyType, res);
});

router.get("/works", (req, res, next) => {
  return getAll(WorkType, res);
});

router.get("/workForces", (req, res, next) => {
  return getAll(WorkforceType, res);
});

router.get("/tenders", (req, res, next) => {
  return getAll(TenderType, res);
});

router.get("/clients", (req, res, next) => {
  return getAll(ClientType, res);
});

module.exports = router;
