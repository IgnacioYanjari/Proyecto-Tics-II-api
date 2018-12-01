let jwt = require("jsonwebtoken");
async function parseToken(req, res, next) {
  // Obtener valor de cabecera de autorización.
  const bearerHeader = req.headers["authorization"];

  // Verificar que no sea indefinido
  if (typeof bearerHeader == "undefined") {
    return res.send({
      success: "fail",
      message: "No se envió token"
    });
  }
  // Separamos debido a que estan separados por espacio.
  const bearer = bearerHeader.split(" ");
  // Obtenemos token.
  const bearerToken = bearer[1];
  let error = await jwt.verify(bearerToken, "secret_key", function(
    err,
    decode
  ) {
    if (err) return err;
    else return false;
  });

  if (error) {
    return res.send({
      success: "fail",
      message: error.message
    });
  }
  // Guardamos en req
  req.token = bearerToken;
  // Seguimos con el siguiente middleware
  next();
}

module.exports = parseToken;
