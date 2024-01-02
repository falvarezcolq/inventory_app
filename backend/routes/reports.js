const { Router } = require("express");
const conexionPG = require("../config/config_pg.js");

const sequelize = require("../config/config_sequelize.js");
const { Op } = require("sequelize");
let router = Router();

const Orders = require("../models/order.js");
const OrderItems = require("../models/order_item.js");
const Product = require("../models/product.js");
const Unit = require("../models/unit.js");


// GET report purchase
router.get("/report_purchase", async (req, res) => {
    try {
      

        const orders = await Orders.findAll({
            where: {
                type_movement_id: 1
            },
            order: [["order_id", "ASC"]],
            include: [{
                model: OrderItems,
                attributes: ['order_item_id', 'order_id', 'product_id', 'unit_id', 'quantity', 'price', 'subtotal'],
                include: [{
                    model: Product,
                    attributes: ['product_id', 'name']
                },
                {
                    model: Unit,
                    attributes: ['unit_id', 'abbreviation',]
                }]
            }]
        });

        if (orders) {
            res.status(200).json({ code: 1, message: "OK", content: {orders} });
        } else {
            res.status(404).json({ code: 0, message: "Order not found", content: "" });
        }
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

//post report sales
router.post("/report_sales", async (req, res) => {
    try {
        const {date_init, date_end } = req.body
        const orders = await Orders.findAll({
            where: {
                type_movement_id: 5,
                order_date: {  
                    [Op.between]: [date_init, date_end]
                }
            },
            order: [["order_id", "ASC"]],
            include: [{
                model: OrderItems,
                attributes: ['order_item_id', 'order_id', 'product_id', 'unit_id', 'quantity', 'price', 'subtotal'],
                include: [{
                    model: Product,
                    attributes: ['product_id', 'name']
                },
                {
                    model: Unit,
                    attributes: ['unit_id', 'abbreviation',]
                }]
            }]
        });

        if (orders) {
            res.status(200).json({ code: 1, message: "OK", content: {orders} });
        } else {
            res.status(404).json({ code: 0, message: "Order not found", content: "" });
        }
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});

module.exports = router;