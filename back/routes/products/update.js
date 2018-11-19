let express = require('express');
let router = express.Router();
let { Machine, Material, Supply } = require('../../models');
const camelcaseKeys = require('camelcase-keys');

function cleanData(data) {
    for (var i in data) {
        if (data[i] === null || typeof data[i] === 'undefined') {
            delete data[i];
        } else if (typeof data[i] === 'object') {
            cleanData(data[i]);
        }
    }
    return data;
}

function update(model, data, res) {
  console.log(JSON.stringify(data, null, 3));
  if (!data.id) {
    return res.send({
      status: 'fail',
      messages : ['Id es necesario para editar']
    });
  }
  return model.findById(data.id).then( result => {
    delete data.id;
    data = cleanData(data);
    result.update(data)
      .then( (result) => {
        return res.send({
          status: 'success',
          data: camelcaseKeys(result.dataValues)
        })
      })
      .catch( err => {
        console.log(err);
          res.status(500).send({
            status: 'fail',
            messages: ['Error servidor']
          });
      })

  }).catch( err => {
    console.log(err);
      res.status(500).send({
        status: 'fail',
        messages: ['Error servidor']
      })
  })
}

router.put('/machines/:id', (req, res, next) => {
  let {name, price} = req.body;
  let {id} = req.params;
  let data = {name, price, id};
  return update(Machine, data, res);
});

router.put('/materials/:id', (req, res, next) => {
  let {name, price} = req.body;
  let {id} = req.params;
  let data = {name, price, id};
  return update(Material, data, res);
});

router.put('/supplies/:id', (req, res, next) => {
  let {name, price} = req.body;
  let {id} = req.params;
  let data = {name, price, id};
  return update(Supply, data, res);
});

module.exports = router;
