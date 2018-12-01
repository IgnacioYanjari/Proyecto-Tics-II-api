let express = require("express");
let router = express.Router();
let {Worker} = require("../../models");
const camelcaseKeys = require("camelcase-keys");

function get(model, res) {
  return model
    .findAll({
      attributes: {
        exclude: ["updated_at", "deleted_at"]
      }
    })
    .then(data => {
      let response = [];
      data.map(value => {
        response.push(camelcaseKeys(value.get()));
      });
      return res.send({
        status: "success",
        data: response
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        status: "fail",
        messages: err.errors[0].message
      });
    });
}

router.get("", (req, res, next) => {
  return get(Worker, res);
});

module.exports = router;
