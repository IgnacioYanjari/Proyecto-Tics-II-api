let express = require('express');
let router = express.Router();
let { MaterialType, MachineType, SupplyType,
      WorkType, WorkforceType, TenderType,
      ClientType} = require('../models');

function getAll(model, res) {
  return model.find({
    attributes: {
      exclude: ['updated_at', 'deleted_at']
    }
  }).then( data => {
    return res.send({
      status : 'success',
      data : data
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

router.get('/materials', (req, res, next) => {
  return getAll(MaterialType, res);
});

router.get('/machines', (req, res, next) => {
  return getAll(MachineType, res);
});

router.get('/supplies', (req, res, next) => {
  return getAll(SupplyType, res);
});

router.get('/works', (req, res, next) => {
  return getAll(WorkType, res);
});

router.get('/work-forces', (req, res, next) => {
  return getAll(WorkforceType, res);
});

router.get('/tenders', (req, res, next) => {
  return getAll(TenderType, res);
});

router.get('/clients', (req, res, next) => {
  return getAll(ClientType, res);
});

module.exports = router;
