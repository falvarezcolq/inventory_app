const { Router } = require("express");
const conexionPG = require("../config/config_pg.js");

const sequelize = require("../config/config_sequelize.js");
const { Op } = require("sequelize");
let router = Router();

const Orders = require("../models/order.js");
const OrderItems = require("../models/order_item.js");
const Product = require("../models/product.js");
const Unit = require("../models/unit.js");
const InventoryMovement = require("../models/inventory_movement.js");


// GET report purchase
router.get("/report_purchase", async (req, res) => {
    try {
      

        const orders = await Orders.findAll({
            where: {
                type_movement_id: 1,
                canceled: false,
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
                },
                canceled: false,

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
router.post("/report_balance", async (req, res) => {
    try {
        const {date_init, date_end, product_id } = req.body
        let products = null;
        if(product_id){
            products = await Product.findAll({ 
                where: {
                    product_id: product_id
                },
                order: [["name", "ASC"],[OrderItems, "order_id", "ASC"]],
                include: [{
                    model: Unit,
                    attributes: ['unit_id', 'abbreviation',]
                },{
                    model: OrderItems,
                    attributes: ['order_item_id', 'order_id', 'product_id', 'unit_id', 'quantity', 'price', 'subtotal','type_movement_id','movement_type'],
                    
                    include:[{
                        model: Orders,
                        attributes: ['order_id', 'order_date'],
                        where: {
                            type_movement_id: {
                                [Op.or]: [1, 5]
                            },
                            canceled: false,    
                        },
                    },{
                       model: InventoryMovement,
                       attributes: ['movement_id', 'quantity', 'type_movement_id','balance'], 
                    }],
                }]
            });
        }else{
            products = await Product.findAll({ 
                order: [["name", "ASC"],[OrderItems, "order_id", "ASC"]],
                include: [{
                    model: Unit,
                    attributes: ['unit_id', 'abbreviation',]
                },{
                    model: OrderItems,
                    attributes: ['order_item_id', 'order_id', 'product_id', 'unit_id', 'quantity', 'price', 'subtotal','type_movement_id','movement_type'],
                    
                    include:[{
                        model: Orders,
                        attributes: ['order_id', 'order_date'],
                        where: {
                            type_movement_id: {
                                [Op.or]: [1, 5]
                            },
                            canceled: false,    
                        },
                    },{
                    model: InventoryMovement,
                    attributes: ['movement_id', 'quantity', 'type_movement_id','balance'], 
                    }],
                
                
                }]
            });
        }
         
      
        res.status(200).json({ code: 1, message: "OK", content:products });
        
    } catch (error) {
        res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
    }
});
module.exports = router;