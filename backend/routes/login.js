const { Router } = require("express");
const { generateJWT } = require("../helpers/generar-jwt.js");
let router = Router();
const bcrypt  = require('bcrypt');


const Users = require("../models/user.js");

// GET login user
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find the user with the provided username and password
        const user = await Users.findOne({ where: { username, active: true } });
        
        if (user) {
            // User found, serialize the user data

            //const password_cryp = bcrypt.hashSync(username,10);

            const validaContrasenia = bcrypt.compareSync(
                password,
                user.password
            ); 

            if (validaContrasenia) {
                const token = await generateJWT({
                    usuario_id: user.usuario_id,
                    username: user.username,
                    // email: user.email,
                    // rol: user.rol,
                    actualizar:false,
                },);
                res.status(200).json({ codigo: 1, mensaje: "OK", contenido: token });
            }else{
                res.status(404).json({ codigo: 0, mensaje: "Usuario no encontrado", contenido: "" });   
            }
        } else {
            // User not found or inactive
            res.status(404).json({ codigo: 0, mensaje: "Usuario no encontrado", contenido: "" });
        }
    } catch (error) {
        res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
    }
});


module.exports = router;