let express = require("express");
let usersRouter = require("./users");
let authRouter = require("./auth");
let typesRouter = require("./types");
let productsRouter = require("./products");
let workersRouter = require("./workers");
let router = express.Router();
let parseToken = require("./middlewares/token");

router.use("/products", parseToken, productsRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/types", parseToken, typesRouter);
router.use("/workers", parseToken, workersRouter);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {title: "Express"});
});

module.exports = router;
