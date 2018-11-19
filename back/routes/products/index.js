let express = require('express');
let router = express.Router();
let gets = require('./get');
let update = require('./update');

router.use('', gets);
router.use('', update)

module.exports = router;
