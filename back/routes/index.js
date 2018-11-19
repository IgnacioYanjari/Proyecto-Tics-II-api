let express = require('express');
let usersRouter = require('./users');
let authRouter = require('./auth');
let typesRouter = require('./types.js');
let productsRouter = require('./products');
let router = express.Router();
let parseToken = require('./middlewares/token');

router.use('/products', parseToken, productsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/types', parseToken, typesRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
