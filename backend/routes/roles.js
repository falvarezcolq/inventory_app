const { Router } = require("express");
const conexionPG = require("../config/config_pg.js");

const sequelize = require("../config/config_sequelize.js");
let router = Router();
const { Op } = require("sequelize");

const Roles = require("../models/role.js");


// GET all roles with pagination
router.get("/roles", async (req, res) => {
    try {
        const whereClause = {
            active: true
        };
        const roles = await Roles.findAndCountAll({
            where: whereClause,
        });
        const serializedRoles = roles.rows.map(role => serialize(role));
        res.status(200).json({ code: 1, message: "OK", content: serializedRoles, total: roles.count });
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: error.message });
    }
});

// Serialize role data
function serialize(role) {
    return {
        role_id: role.role_id,
        role_name: role.role_name,
        created_at: role.created_at,
    };
}

// GET a specific role by ID
router.get("/roles/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Roles.findOne({
            where: {
                role_id: id
            }
        }); 
        if (role) {
            res.status(200).json({ code: 1, message: "OK", content: role });
        } else {
            res.status(404).json({ code: 0, message: "Role not found", content: "" });
        }
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

// CREATE a new role
// router.post("/roles", async (req, res) => {
//     try {
//         const { role_name } = req.body;
//         const newRole = await Roles.create({ 
//             role_name,
//         });
//         res.status(201).json({ code: 1, message: "Role created successfully", content: newRole });
//     } catch (error) {
//         res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
//     }
// });

// UPDATE a role
// router.put("/roles/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { role_name } = req.body;
//         const updatedRole = await Roles.update(
//             { role_name },
//             {
//                 where: {
//                     role_id: id
//                 }
//             }
//         );
//         if (updatedRole[0] === 1) {
//             res.status(200).json({ code: 1, message: "Role updated successfully", content: "" });
//         } else {
//             res.status(404).json({ code: 0, message: "Role not found", content: "" });
//         }
//     } catch (error) {
//         res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
//     }
// });

// DELETE a role
// router.delete("/roles/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedRole = await Roles.destroy({
//             where: {
//                 role_id: id
//             }
//         });
//         if (deletedRole === 1) {
//             res.status(200).json({ code: 1, message: "Role deleted successfully", content: "" });
//         } else {
//             res.status(404).json({ code: 0, message: "Role not found", content: "" });
//         }
//     } catch (error) {
//         res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
//     }
// });

module.exports = router;