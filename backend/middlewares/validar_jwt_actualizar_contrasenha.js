const { response, request } = require("express");
const rol = require("../helpers/obtener_rol.helper");
const jwt = require('jsonwebtoken');
const validarJWT_sin_confirmar = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) { throw{ message: "No hay token en la peticion", }  }
    const usuario = jwt.verify(token, process.env.SECRET_KEY);
  
    req.body.usuario = usuario;
  
    next();
  } catch (error) {
    return res.status(401).json({
      code: 0,
      message: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT_sin_confirmar,
};
