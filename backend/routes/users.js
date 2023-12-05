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
    res.status(200).json({ code: 1, message: "OK", content: serializedUsers });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
      res.status(200).json({ code: 1, message: "OK", content: user });
    } else {
      res.status(404).json({ code: 0, message: "User not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
    res.status(201).json({ code: 1, message: "User created successfully", content: newUser });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
      res.status(200).json({ code: 1, message: "User updated successfully", content: "" });
    } else {
      res.status(404).json({ code: 0, message: "User not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
      res.status(200).json({ code: 1, message: "User deleted successfully", content: "" });
    } else {
      res.status(404).json({ code: 0, message: "User not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});


module.exports = router;