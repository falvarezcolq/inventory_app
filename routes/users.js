const { Router } = require("express");
const conexionPG = require("../config/config_pg.js");

const sequelize = require("../config/config_sequelize.js");
let router = Router();

const Users = require("../models/user.js");

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await Users.findAll({ where: { active: true } });
    const serializedUsers = users.map(user => serialize(user));
    res.status(200).json({ codigo: 1, mensaje: "OK", contenido: serializedUsers });
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// Serialize user data
function serialize(user) {
  return {
    user_id: user.user_id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    address: user.address,
  };
}

// GET a specific user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({
      where: {
        user_id: id
      }
    });
    if (user) {
      res.status(200).json({ codigo: 1, mensaje: "OK", contenido: user });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "User not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// CREATE a new user
router.post("/users", async (req, res) => {
  try {
    const { username, email, phone, address } = req.body;
    const password_cryp = bcrypt.hashSync(username,10);
    const role_id = 2;
    const newUser = await Users.create({
        username,
        password:password_cryp,
        email,
        address,
        phone,
        role_id,
    });
    res.status(201).json({ codigo: 1, mensaje: "User created successfully", contenido: newUser });
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// UPDATE a user
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, phone, address } = req.body;
    const updatedUser = await Users.update(
      { username, email, phone, address },
      {
        where: {
          user_id: id
        }
      }
    );
    if (updatedUser[0] === 1) {
      res.status(200).json({ codigo: 1, mensaje: "User updated successfully", contenido: "" });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "User not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// DELETE a user
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await Users.destroy({
      where: {
        user_id: id
      }
    });
    if (deletedUser === 1) {
      res.status(200).json({ codigo: 1, mensaje: "User deleted successfully", contenido: "" });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "User not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});


module.exports = router;