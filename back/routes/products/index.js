let express = require('express');
let router = express.Router();
let gets = require('./get');
let update = require('./update');
let create = require('./create');

router.use('', gets);
router.use('', update)
router.use('',create);

module.exports = router;
