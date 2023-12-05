const { Router } = require("express");
const conexionPG = require("../config/config_pg.js");

const sequelize = require("../config/config_sequelize.js");
let router = Router();
const { Op } = require("sequelize");

const Categories = require("../models/category.js");


// GET all categories with pagination
router.get("/categories", async (req, res) => {
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
        const categories = await Categories.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["name", "ASC"]]
        });
        const serializedCategories = categories.rows.map(category => serialize(category));
        res.status(200).json({ code: 1, message: "OK", content: serializedCategories, total: categories.count });
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

// Serialize category data
function serialize(category) {
    return {
        category_id: category.category_id,
        name: category.name,
    };
}

// GET a specific category by ID
router.get("/categories/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Categories.findOne({
            where: {
                category_id: id
            }
        }); 
        if (category) {
            res.status(200).json({ code: 1, message: "OK", content: category });
        } else {
            res.status(404).json({ code: 0, message: "Category not found", content: "" });
        }
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

// CREATE a new category
router.post("/categories", async (req, res) => {
    try {
        const { name } 
        = req.body;
        const newCategory = await Categories.create({ 
            name,
        });
        res.status(201).json({ code: 1, message: "Category created successfully", content: newCategory });
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

// UPDATE a category
router.put("/categories/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedCategory = await Categories.update(
            { name },
            {
                where: {
                    category_id: id
                }
            }
        );
        if (updatedCategory[0] === 1) {
            res.status(200).json({ code: 1, message: "Category updated successfully", content: "" });
        } else {
            res.status(404).json({ code: 0, message: "Category not found", content: "" });
        }
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

// DELETE a category
router.delete("/categories/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Categories.destroy({
            where: {
                category_id: id
            }
        });
        if (deletedCategory === 1) {
            res.status(200).json({ code: 1, message: "Category deleted successfully", content: "" });
        } else {
            res.status(404).json({ code: 0, message: "Category not found", content: "" });
        }
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

module.exports = router;