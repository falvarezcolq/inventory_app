const { Router } = require("express");
const conexionPG = require("../config/config_pg.js");

const sequelize = require("../config/config_sequelize.js");
const { Op } = require("sequelize");
let router = Router();

const Orders = require("../models/order.js");

// GET all orders
router.get("/orders", async (req, res) => {
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
            whereClause.razon_social = {
                [Op.like]: `%${name}%`
            };
        }
        const orders = await Orders.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["order_date", "ASC"]]
        });
        const serializedOrders = orders.rows.map(order => serialize(order));
        res.status(200).json({ code: 1, message: "OK", content: serializedOrders, total: orders.count });
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

// Serialize order data
function serialize(order) {
    return {
        order_id: order.order_id,
        user_id: order.user_id,
        nit: order.nit,
        razon_social: order.razon_social,
        order_date: order.order_date,
        total_amount: order.total_amount,
        type_movement_id: order.type_movement_id,
        movement_type: order.movement_type,
        total_items: order.total_items,
       
    };
}

// GET a specific order by ID
router.get("/orders/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Orders.findOne({
            where: {
                order_id: id
            }
        });
        if (order) {
            res.status(200).json({ code: 1, message: "OK", content: order });
        } else {
            res.status(404).json({ code: 0, message: "Order not found", content: "" });
        }
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

// CREATE a new order
router.post("/orders", async (req, res) => {
    try {
        const { user_id, nit, razon_social, order_date, total_amount, type_movement_id, movement_type, total_items, active, created_by, updated_by } = req.body;
        const newOrder = await Orders.create({
            user_id,
            nit,
            razon_social,
            order_date,
            total_amount,
            type_movement_id,
            movement_type,
            total_items,
            active,
            created_by,
            updated_by
        });
        res.status(201).json({ code: 1, message: "Order created successfully", content: newOrder });
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

// UPDATE an order
router.put("/orders/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, nit, razon_social, order_date, total_amount, type_movement_id, movement_type, total_items, active, created_by, updated_by } = req.body;
        const updatedOrder = await Orders.update(
            { 
                user_id,
                nit,
                razon_social,
                order_date,
                total_amount,
                type_movement_id,
                movement_type,
                total_items,
                active,
                created_by,
                updated_by
            },
            {
                where: {
                    order_id: id
                }
            }
        );
        if (updatedOrder[0] === 1) {
            res.status(200).json({ code: 1, message: "Order updated successfully", content: "" });
        } else {
            res.status(404).json({ code: 0, message: "Order not found", content: "" });
        }
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

// DELETE an order
router.delete("/orders/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Orders.destroy({
            where: {
                order_id: id
            }
        });
        if (deletedOrder === 1) {
            res.status(200).json({ code: 1, message: "Order deleted successfully", content: "" });
        } else {
            res.status(404).json({ code: 0, message: "Order not found", content: "" });
        }
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

module.exports = router;