const { Router } = require("express");
const conexionPG = require("../config/config_pg.js");

const sequelize = require("../config/config_sequelize.js");
const { Op } = require("sequelize");
let router = Router();

const Suppliers = require("../models/supplier.js");

// GET all suppliers
router.get("/suppliers", async (req, res) => {
    try {
        const { page, limit, name } = req.query;
        if (!page || !limit) {
           page = 1;
           limit = 10000;   
        }
        const offset = (page - 1) * limit;
        const whereClause = {
            active: true
        };
        if (name) {
            whereClause.supplier_name = {
                [Op.like]: `%${name}%`
            };
        }
        const suppliers = await Suppliers.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["supplier_name", "ASC"]]
        });
        const serializedSuppliers = suppliers.rows.map(supplier => serialize(supplier));
        res.status(200).json({ code: 1, message: "OK", content: serializedSuppliers, total: suppliers.count });
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

router.get("/suppliers/suppliers", async (req, res) => {
    try {
        const { page, limit, name } = req.query;
        if (!page || !limit) {
           page = 1;
           limit = 10000;   
        }
        const offset = (page - 1) * limit;
        const whereClause = {
            active: true,
            supplier: true,     
        };
        if (name) {
            whereClause.supplier_name = {
                [Op.like]: `%${name}%`
            };
        }
        const suppliers = await Suppliers.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["supplier_name", "ASC"]]
        });
        const serializedSuppliers = suppliers.rows.map(supplier => serialize(supplier));
        res.status(200).json({ code: 1, message: "OK", content: serializedSuppliers, total: suppliers.count });
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

// Serialize supplier data
function serialize(supplier) {
    return {
        supplier_id: supplier.supplier_id,
        nit: supplier.nit,
        razon_social: supplier.razon_social,
        supplier_name: supplier.supplier_name,
        contact_person: supplier.contact_person,
        contact_email: supplier.contact_email,
        contact_phone: supplier.contact_phone,
        address: supplier.address,
        customer: supplier.customer,
        supplier: supplier.supplier,
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
            res.status(200).json({ code: 1, message: "OK", content: supplier });
        } else {
            res.status(404).json({ code: 0, message: "Supplier not found", content: "" });
        }
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

// CREATE a new supplier
router.post("/suppliers", async (req, res) => {
    try {
        const { nit,razon_social, supplier_name, contact_person, contact_email,contact_phone, customer, supplier, address } = req.body;
        const newSupplier = await Suppliers.create({
            nit,
            razon_social,
            supplier_name,
            contact_person,
            contact_email,
            contact_phone,
            address,
            customer,
            supplier
        });
        res.status(201).json({ code: 1, message: "Supplier created successfully", content: newSupplier });
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

// UPDATE a supplier
router.put("/suppliers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {  nit, razon_social, supplier_name, contact_person, contact_email, contact_phone, address, customer, supplier
         } = req.body;
        const updatedSupplier = await Suppliers.update(
            { 
                nit,razon_social,supplier_name,contact_person,contact_email,contact_phone,address,customer,supplier
            },
            {
                where: {
                    supplier_id: id
                }
            }
        );
        if (updatedSupplier[0] === 1) {
            res.status(200).json({ code: 1, message: "Supplier updated successfully", content: "" });
        } else {
            res.status(404).json({ code: 0, message: "Supplier not found", content: "" });
        }
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
            res.status(200).json({ code: 1, message: "Supplier deleted successfully", content: "" });
        } else {
            res.status(404).json({ code: 0, message: "Supplier not found", content: "" });
        }
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

module.exports = router;