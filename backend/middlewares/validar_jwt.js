const { response, request } = require("express");
// const rol = require("../helpers/obtener_rol.helper");
const jwt = require('jsonwebtoken');


const validarJWT = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) { throw{ message: "There is not token", }}

    const userauth = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userauth = userauth;
  
    next();
  } catch (error) {
    return res.status(401).json({
      code: 0,
      message: "Token error",
    });
  }
};

module.exports = {
  validarJWT,
};
