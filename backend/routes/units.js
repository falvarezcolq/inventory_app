const { Router } = require("express");
let router = Router();
const { Op } = require("sequelize");
const Unit = require("../models/unit.js");


// GET all units with pagination
router.get("/units", async (req, res) => {
    try {
        const { page, limit, name } = req.query;
        const offset = (page - 1) * limit;
        const whereClause = {
            active: true
        };
        if (name) {
            whereClause.name = {
                [Op.like]: `%${name}%`
            };
        }
        const units = await Unit.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["name", "ASC"]]
        });
        const serializedUnits = units.rows.map(unit => serialize(unit));
        res.status(200).json({ code: 1, message: "OK", content: serializedUnits, total: units.count });
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

// Serialize unit data
function serialize(unit) {
    return {
        unit_id: unit.unit_id,
        name: unit.name,
        abbreviation: unit.abbreviation,
    };
}

// GET a specific unit by ID
router.get("/units/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const unit = await Unit.findOne({
            where: {
                unit_id: id
            }
        }); 
        if (unit) {
            res.status(200).json({ code: 1, message: "OK", content: unit });
        } else {
            res.status(404).json({ code: 0, message: "Unit not found", content: "" });
        }
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});
        
// CREATE a new unit
router.post("/units", async (req, res) => {
    try {
        const { name, abbreviation } = req.body;
        const newUnit = await Unit.create({ 
            name,
            abbreviation,
        });
        res.status(201).json({ code: 1, message: "Unit created successfully", content: newUnit });
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

// UPDATE a unit
router.put("/units/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, abbreviation } = req.body;
        const updatedUnit = await Unit.update(
            { name, abbreviation },
            {
                where: {
                    unit_id: id
                }
            }
        );
        if (updatedUnit[0] === 1) {
            res.status(200).json({ code: 1, message: "Unit updated successfully", content: "" });
        } else {
            res.status(404).json({ code: 0, message: "Unit not found", content: "" });
        }
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

// DELETE a unit
router.delete("/units/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUnit = await Unit.destroy({
            where: {
                unit_id: id
            }
        });
        if (deletedUnit === 1) {
            res.status(200).json({ code: 1, message: "Unit deleted successfully", content: "" });
        } else {
            res.status(404).json({ code: 0, message: "Unit not found", content: "" });
        }
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

module.exports = router;