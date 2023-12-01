const { Router } = require("express");
const conexionPG = require("../config/config_pg.js");

const sequelize = require("../config/config_sequelize.js");
let router = Router();

const Suppliers = require("../models/supplier.js");

// GET all suppliers
router.get("/suppliers", async (req, res) => {
    try {
        const suppliers = await Suppliers.findAll({ where: { active: true } });
        const serializedSuppliers = suppliers.map(supplier => serialize(supplier));
        res.status(200).json({ codigo: 1, mensaje: "OK", contenido: serializedSuppliers });
    } catch (error) {
        res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
    }
});

// Serialize supplier data
function serialize(supplier) {
    return {
        supplier_id: supplier.supplier_id,
        supplier_name: supplier.supplier_name,
        contact_person: supplier.contact_person,
        contact_email: supplier.contact_email,
        contact_phone: supplier.contact_phone,
        address: supplier.address,
    };
}

// GET a specific supplier by ID
router.get("/suppliers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await Suppliers.findOne({
            where: {
                supplier_id: id
            }
        });
        if (supplier) {
            res.status(200).json({ codigo: 1, mensaje: "OK", contenido: supplier });
        } else {
            res.status(404).json({ codigo: 0, mensaje: "Supplier not found", contenido: "" });
        }
    } catch (error) {
        res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
    }
});

// CREATE a new supplier
router.post("/suppliers", async (req, res) => {
    try {
        const { supplier_name, contact_person, contact_email,contact_phone, address } = req.body;
        const newSupplier = await Suppliers.create({
            supplier_name,
            contact_person,
            contact_email,
            contact_phone,
            address
        });
        res.status(201).json({ codigo: 1, mensaje: "Supplier created successfully", contenido: newSupplier });
    } catch (error) {
        res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
    }
});

// UPDATE a supplier
router.put("/suppliers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { supplier_name } = req.body;
        const updatedSupplier = await Suppliers.update(
            { supplier_name },
            {
                where: {
                    supplier_id: id
                }
            }
        );
        if (updatedSupplier[0] === 1) {
            res.status(200).json({ codigo: 1, mensaje: "Supplier updated successfully", contenido: "" });
        } else {
            res.status(404).json({ codigo: 0, mensaje: "Supplier not found", contenido: "" });
        }
    } catch (error) {
        res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
    }
});

// DELETE a supplier
router.delete("/suppliers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSupplier = await Suppliers.destroy({
            where: {
                supplier_id: id
            }
        });
        if (deletedSupplier === 1) {
            res.status(200).json({ codigo: 1, mensaje: "Supplier deleted successfully", contenido: "" });
        } else {
            res.status(404).json({ codigo: 0, mensaje: "Supplier not found", contenido: "" });
        }
    } catch (error) {
        res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
    }
});

module.exports = router;