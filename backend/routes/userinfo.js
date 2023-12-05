const { Router } = require("express");
const conexionPG = require("../config/config_pg.js");

const sequelize = require("../config/config_sequelize.js");
let router = Router();

const Users = require("../models/user.js");

const { validarJWT } = require("../middlewares/index.js");


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

// GET all users
router.get("/userinfo", [validarJWT], async (req, res) => {
  try {
    const userauth = req.body.userauth;
    const user = await Users.findOne({
      where: {
        user_id: userauth.user_id
      }
    });
    if (user) {
      res.status(200).json({ code: 1, message: "OK", content: serialize(user) });
    } else {
      res.status(404).json({ code: 0, message: "User not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error", content: "" });
  }
});




module.exports = router;