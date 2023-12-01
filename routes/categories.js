const { Router } = require("express");
const conexionPG = require("../config/config_pg.js");

const sequelize = require("../config/config_sequelize.js");
let router = Router();

const Categories = require("../models/category.js");


// GET all categories
router.get("/categories", async (req, res) => {
    try {
        const categories = await Categories.findAll({ where: {active: true}});
        const serializedCategories = categories.map(category => serialize(category));
        res.status(200).json({ codigo: 1, mensaje: "OK", contenido: serializedCategories });
    } catch (error) {
        res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
    }
});

// Serialize category data
function serialize(category) {
    return {
        category_id: category.category_id,
        name: category.name
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
            res.status(200).json({ codigo: 1, mensaje: "OK", contenido: category });
        } else {
            res.status(404).json({ codigo: 0, mensaje: "Category not found", contenido: "" });
        }
    } catch (error) {
        res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
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
        res.status(201).json({ codigo: 1, mensaje: "Category created successfully", contenido: newCategory });
    } catch (error) {
        res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
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
            res.status(200).json({ codigo: 1, mensaje: "Category updated successfully", contenido: "" });
        } else {
            res.status(404).json({ codigo: 0, mensaje: "Category not found", contenido: "" });
        }
    } catch (error) {
        res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
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
            res.status(200).json({ codigo: 1, mensaje: "Category deleted successfully", contenido: "" });
        } else {
            res.status(404).json({ codigo: 0, mensaje: "Category not found", contenido: "" });
        }
    } catch (error) {
        res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
    }
});

module.exports = router;