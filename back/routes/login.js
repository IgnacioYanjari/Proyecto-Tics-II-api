let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

/* GET home page. */
router.post('/', function(req, res, next) {
  let {user, password} = req.body;
  let userData = {
    user
  };
  console.log(userData);
  let token = jwt.sign(userData,'secret_key');
  res.send({
    'status' : 'success',
    'token' : token
  });
});

module.exports = router;
