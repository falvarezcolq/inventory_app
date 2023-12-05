
const rol_admin = ( req, res, next ) => {
  if(!req.body.contentjwt.roles.some((e)=> e.id_rol==1)){
      return res.status(401).json({
          code: 0,
          message:`El usuario no tiene permiso para realizar esta operacion`
      });
  }
  next();
};
const rol_supervisor = ( req, res, next ) => {
  if(!req.body.contentjwt.roles.some((e)=> e.id_rol==2)){
      return res.status(401).json({
          code: 0,
          message:`El usuario no tiene permiso para realizar esta operacion`
      });
  }
  next();
};
const rol_operador = (req, res, next) => {
  if(!req.body.contentjwt.roles.some((e) => e.id_rol == 3 || e.id_rol == 4)){
      return res.status(401).json({
          code: 0,
          message:`El usuario no tiene permiso para realizar esta operacion`
      });
  }
  next();
};
const rol_consultas = ( req, res, next ) => {
  if(!req.body.contentjwt.roles.some((e) => e.id_rol == 4)){
      return res.status(401).json({
          code: 0,
          message:`El usuario no tiene permiso para realizar esta operacion`
      });
  }
  next();
};
const rol_operador_colsulta = (req, res, next) => {
  if(!req.body.contentjwt.roles.some((e)=> e.id_rol==3 || e.id_rol==4 || e.id_rol==5)){
      return res.status(401).json({
          code: 0,
          message:`El usuario no tiene permiso para realizar esta operacion`
      });
  }
  next();
};

module.exports = {
  rol_admin,
  rol_supervisor,
  rol_operador,
  rol_consultas,
  rol_operador_colsulta
};