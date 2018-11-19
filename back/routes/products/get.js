let express = require('express');
let router = express.Router();
let { Machine, Material, Supply } = require('../../models');
const camelcaseKeys = require('camelcase-keys');

function get(model, res) {
  return model.findAll({
    include: ['type'],
    attributes: {
      exclude: ['updated_at', 'deleted_at'],
    }
  }).then( data => {
    let response = [];
    data.map( value => {
      value.dataValues.type = value.dataValues.type.name;
      response.push(camelcaseKeys(value.get()));
    });
    return res.send({
      status : 'success',
      data : response
    });
  })
  .catch( err => {
    console.log(err);
    res.status(500).send({
      status: 'fail',
      messages: ['Error servidor']
    })
  })
}

router.get('/machines', (req, res, next) => {
  return get(Machine, res);
});
router.get('/materials', (req, res, next) => {
  return get(Material, res);
});
router.get('/supplies', (req, res, next) => {
  return get(Supply, res);
});

module.exports = router;
