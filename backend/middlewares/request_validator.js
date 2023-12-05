const yup = require("yup");


/* EJEMPLO*/
// const schema = yup.object({
//     body: yup.object({
//       usr_usuario:yup.string().min(4).reuired(),
//       usr_password:yup.string().min(4).max(50).reuired(),
//       url: yup.string().url().required(),
//       title: yup.string().min(8).max(32).required(),
//       content: yup.string().min(8).max(255).required(),
//       contact: yup.string().email().required(),
//     }),
//     params: yup.object({
//       id: yup.number().required(),
//     }),  
// });


const RequestValidator = {
    login: async (req, res, next) => {
        try {
            const schema = yup.object({
                body: yup.object({
                    usr_usuario: yup.string().min(2).max(100).required(),
                    usr_password: yup.string().min(2).max(50).required(),
                }),
            });
          await schema.validate({  body: req.body,  query: req.query,  params: req.params });
          return next();
        } catch (err) {
          return res.status(500).json({ code: 0, type: err.name, message: err.message });
        }
    },

    setUsuario: async (req, res, next) => {
        try {
           const  nacionalidad = req.body.nacionalidad;
           if(!nacionalidad){
            throw {message:"No existe nacionalidad"}
           }
           
           if(nacionalidad=='BOL'){
                  const schemaBol = yup.object({
                    body: yup.object({
                        nombres:yup.string().min(0).max(100).required(),
                        primer_apellido:yup.string().min(0).max(50).required(),
                        segundo_apellido:yup.string().min(0).max(50),
                        // otro_apellido:yup.string().min(0).max(50),
                        fecha_nacimiento:yup.date().required(),
                        // genero:yup.string().min(0).max(50).required(),
                        nacionalidad:yup.string().min(0).max(20).required(),
                        // pais_nacimiento:yup.string().min(0).max(20).required(),
                        // lugar_nacimiento:yup.string().min(0).max(20),
                        // direccion:yup.string().min(0).max(150),
                        email:yup.string().email().min(0).max(50).required(),
                        telefono:yup.string().min(0).max(15).required(),
                        tipo_documento:yup.string().min(0).max(50).required(),
                        nro_documento:yup.string().min(0).max(50).required(),
                        // fecha_emision:yup.date().nullable().default(undefined),
                        // fecha_expiracion:yup.date().nullable().default(undefined),
                        // indefinido:yup.boolean().required(),
                        // nacionalidad_emision:yup.string().min(0).max(100),
                        password:yup.string().min(4).max(50).required(),
                        phone_code:yup.string().max(20),
                    }),
                });
              await schemaBol.validate({  body: req.body,  query: req.query,  params: req.params });
           } else {
            const schema = yup.object({
              body: yup.object({
                  nombres:yup.string().min(0).max(100).required(),
                  primer_apellido:yup.string().min(0).max(50).required(),
                  segundo_apellido:yup.string().min(0).max(50),
                  otro_apellido:yup.string().min(0).max(50),
                  fecha_nacimiento:yup.date().required(),
                  genero:yup.string().min(0).max(50).required(),
                  nacionalidad:yup.string().min(0).max(20).required(),
                  pais_nacimiento:yup.string().min(0).max(20).required(),
                  lugar_nacimiento:yup.string().min(0).max(20),
                  direccion:yup.string().min(0).max(150),
                  email:yup.string().email().min(0).max(50).required(),
                  telefono:yup.string().min(0).max(15).required(),
                  tipo_documento:yup.string().min(0).max(50).required(),
                  nro_documento:yup.string().min(0).max(50).required(),
                  fecha_emision:yup.date().nullable().default(undefined),
                  fecha_expiracion:yup.date().nullable().default(undefined),
                  indefinido:yup.boolean().required(),
                  nacionalidad_emision:yup.string().min(0).max(100),
                  password:yup.string().min(4).max(50).required(),
                  phone_code:yup.string().max(20),
              }),
              });
            await schema.validate({  body: req.body,  query: req.query,  params: req.params });
           }

           

        
          return next();
        } catch (err) {
          return res.status(400).json({ code: 0, type: err.name, message: err.message });
        }
    },

    putUsuario: async (req, res, next) => {
      try {
          const schema = yup.object({
              body: yup.object({
                  nombres:yup.string().min(0).max(100).required(),
                  primer_apellido:yup.string().min(0).max(50).required(),
                  segundo_apellido:yup.string().min(0).max(50),
                  otro_apellido:yup.string().min(0).max(50),
                  fecha_nacimiento:yup.date().required(),
                  genero:yup.string().min(0).max(50).required(),
                  nacionalidad:yup.string().min(0).max(20).required(),
                  pais_nacimiento:yup.string().min(0).max(20).required(),
                  lugar_nacimiento:yup.string().min(0).max(20),
                  direccion:yup.string().min(0).max(150),
                  // email:yup.string().email().min(0).max(50).required(),
                  telefono:yup.string().min(0).max(15).required(),
                  tipo_documento:yup.string().min(0).max(50).required(),
                  nro_documento:yup.string().min(0).max(50).required(),
                  fecha_emision:yup.date().nullable().default(undefined),
                  fecha_expiracion:yup.date().nullable().default(undefined),
                  indefinido:yup.boolean().required(),
                  nacionalidad_emision:yup.string().min(0).max(100),
                  // password:yup.string().min(4).max(50).required(),
              }),
          });
        await schema.validate({  body: req.body,  query: req.query,  params: req.params });
        return next();
      } catch (err) {
        return res.status(400).json({ code: 0, type: err.name, message: err.message });
      }
    },
    getEmail: async (req, res, next) => {
      try {
          const schema = yup.object({
              params: yup.object({
                email:yup.string().email().min(0).max(50).required(),
              }),
          });
        await schema.validate({  body: req.body,  query: req.query,  params: req.params });
        return next();
      } catch (err) {
        return res.status(400).json({ code: 0, type: err.name, message: err.message });
      }
    },
    recuperar_contrasenha: async (req, res, next) => {
      try {
          const schema = yup.object({
              body: yup.object({
                email:yup.string().email().min(0).max(50).required(),
              }),
          });
        await schema.validate({  body: req.body,  query: req.query,  params: req.params });
        return next();
      } catch (err) {
        return res.status(400).json({ code: 0, type: err.name, message: err.message });
      }
    },
    setPassword: async (req, res, next) => {
      try {
          const schema = yup.object({
              body: yup.object({
                new_password:yup.string().min(4).max(50).required(),
              }),
          });
        await schema.validate({  body: req.body,  query: req.query,  params: req.params });
        return next();
      } catch (err) {
        return res.status(400).json({ code: 0, type: err.name, message: err.message });
      }
    },
    setAcountActivation: async (req, res, next) => {
      try {
          const schema = yup.object({
              body: yup.object({
                code:yup.string().min(8).max(8).required(),
              }),
          });
        await schema.validate({  body: req.body,  query: req.query,  params: req.params });
        return next();
      } catch (err) {
        return res.status(400).json({ code: 0, type: err.name, message: err.message });
      }
    },
    proceso_inicio_get:async (req, res, next) => {
      try {
          const schema = yup.object({
              params: yup.object({
                id_proceso_inicio:yup.number().required(),
              }),
          });
        await schema.validate({  body: req.body,  query: req.query,  params: req.params });
        return next();
      } catch (err) {
        return res.status(400).json({ code: 0, type: err.name, message: err.message });
      }
    },
    getParametro:async (req, res, next) => {
      try {
          const schema = yup.object({
              params: yup.object({
                code:yup.string().max(20).required(),
              }),
          });
        await schema.validate({  body: req.body,  query: req.query,  params: req.params });
        return next();
      } catch (err) {
        return res.status(400).json({ code: 0, type: err.name, message: err.message });
      }
    },
    proceso_inicio_buscar:async (req, res, next) => {
      try {
          const schema = yup.object({
              body: yup.object({
                fecha_inicio:yup.date().max(new Date(),"Fecha excedida").nullable().default(null),
                fecha_fin:yup.date().nullable().default(null),
              }),
          });
        await schema.validate({  body: req.body,  query: req.query,  params: req.params });
        return next();
      } catch (err) {
        return res.status(400).json({ code: 0, type: err.name, message: err.message });
      }
    },
    solicitar_aprobacion_tramite:async (req, res, next) => {
      try {
          const schema = yup.object({
              body: yup.object({
                lugar:yup.string().max(3).required(),
              }),
              params: yup.object({
                id_proceso_inicio:yup.number().required(),
              }),
          });
        await schema.validate({  body: req.body,  query: req.query,  params: req.params });
        return next();
      } catch (err) {
        return res.status(400).json({ code: 0, type: err.name, message: err.message });
      }
    }, 
}


module.exports = {
   RequestValidator
}