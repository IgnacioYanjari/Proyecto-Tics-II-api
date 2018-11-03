let express = require('express');
let router = express.Router();
let LoginFunction = require('./auth/login');
let LogOutFunction = require('./auth/logout');
let parseToken = require('./middlewares/token');

router.post('/login',LoginFunction);
router.post('/logout', parseToken, LogOutFunction);

module.exports = router;
