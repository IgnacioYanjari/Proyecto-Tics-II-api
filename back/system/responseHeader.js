module.exports = function( req, res,next){
  // Configuración de la respuesta de cabezera.
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  // res.header("Access-Control-Allow-Headers","*");
  next();
}
