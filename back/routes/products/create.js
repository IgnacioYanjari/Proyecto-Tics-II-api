let express = require("express");
let router = express.Router();
let {
  Machine,
  MachineType,
  Material,
  MaterialType,
  Supply,
  SupplyType
} = require("../../models");
const camelcaseKeys = require("camelcase-keys");

async function create(model, modelType, data, res) {
  if (!data.type_id) {
    return res.send({
      status: "fail",
      messages: ["Id es necesario para editar"]
    });
  }
  let type;
  try {
    type = await modelType.findByPk(data.type_id);
  } catch (e) {
    console.log(err);
    res.status(500).send({
      status: "fail",
      messages: ["Error servidor"]
    });
  }
  data[modelType.name] = type;
  console.log(JSON.stringify(data, null, 3));
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
  console.log("body");
  console.log(req.body);
  let {
    name,
    price,
    brand,
    typeId: type_id,
    weight,
    measurement: weight_type
  } = req.body;
  let data = {name, price, brand, type_id, weight, weight_type};
  console.log(JSON.stringify(data, null, 3));
  return create(Machine, MachineType, data, res);
});

router.post("/materials", (req, res, next) => {
  let {name, price, brand, typeId: type_id} = req.body;
  let data = {name, price, brand, type_id};
  return create(Material, MaterialType, data, res);
});

router.post("/supplies", (req, res, next) => {
  let {name, price, brand, typeId: type_id} = req.body;
  let data = {name, price, brand, type_id};
  return create(Supply, SupplyType, data, res);
});

module.exports = router;
