const { Router } = require("express");
let router = Router();

const sequelize = require("../config/config_sequelize.js");
const InventoryMovement = require("../models/inventory_movement.js");
const Order = require("../models/order.js");
const OrderItem = require("../models/order_item.js");
const Product = require("../models/product.js");
const { validarJWT } = require("../middlewares/validar_jwt.js");
const conexionPG = require("../config/config_pg.js");
const Supplier = require("../models/supplier.js");


// CREATE a new inventory movement
router.post("/in_purchase",[validarJWT], async (req, res) => {
  try {
    const { supplier_id, order_date, items, userauth, total, } = req.body; 
    const type_movement_id = 1; // IN PURCHASE
    const supplier = await Supplier.findOne({ where: { supplier_id: supplier_id,} });
    const result = await sequelize.transaction(async (t) => {
    const newOrder = await Order.create({
      supplier_id,
      nit: supplier.nit,
      razon_social: supplier.razon_social,
      order_date,
      type_movement_id,
      movement_type: "In",
      total_amount: total,
      user_id: userauth.user_id,
      total_items: items.length,
    },{ transaction: t });

    for(let i = 0; i < items.length; i++){
      const {  product_id,  quantity, purchase_price, price, lote, expiration_date, unit_id, stock_quantity,subtotal} = items[i];
     
      const product = await Product.findOne({ where: { product_id: product_id } });
      const newInventoryMovement = await InventoryMovement.create({
        product_id,
        quantity,
        balance: product.stock_quantity + quantity,
        type_movement_id,
        movement_type: "In",
        user_id: userauth.user_id,
        supplier_id: supplier_id,
        
      }, { transaction: t });
      const stock = sequelize.literal(`stock_quantity + ${quantity}`);
      const product_updated =  await Product.update(
        { stock_quantity: stock, purchase_price },
        {
          where: {
            product_id: product_id
          },
          transaction: t 
        });
      
        const newOrderItem = await OrderItem.create({
          order_id: newOrder.order_id,
          product_id,
          quantity,
          price:purchase_price,
          lote,
          expiration_date,
          unit_id,
          type_movement_id,
          movement_type: "In",
          subtotal,
          movement_id: newInventoryMovement.movement_id
        },{ transaction: t });
  }

   
    return { newOrder };
  });
   
    res.status(201).json({ 
      code: 1, 
      message: "Inventory movement created successfully", 
      content: result,
    });

  } catch (error) {
   
    res.status(500).json({ code: 0, message: "Error en consulta", content: error.message });
  }
});

// CREATE a new inventory movement
router.post("/out",[validarJWT], async (req, res) => {
  try {
    const { supplier_id, order_date, items, userauth, total, } = req.body; 
    const type_movement_id = 5; // out sale
    const supplier = await Supplier.findOne({ where: { supplier_id: supplier_id,} });
    const result = await sequelize.transaction(async (t) => {
   
    const newOrder = await Order.create({
      supplier_id,
      nit: supplier.nit,
      razon_social: supplier.razon_social,
      order_date,
      type_movement_id,
      movement_type: "Out",
      total_amount: total,
      user_id: userauth.user_id,
      total_items: items.length,
    },{ transaction: t });

    for(let i = 0; i < items.length; i++){
      const {  product_id,  quantity, purchase_price, price, lote, expiration_date, unit_id, stock_quantity,subtotal} = items[i];
     
      const product = await Product.findOne({ where: { product_id: product_id } });
      const newInventoryMovement = await InventoryMovement.create({
        product_id,
        quantity,
        balance: product.stock_quantity - quantity,
        type_movement_id,
        movement_type: "Out",
        user_id: userauth.user_id,
        supplier_id: supplier_id,
        
      }, { transaction: t });
      const stock = sequelize.literal(`stock_quantity - ${quantity}`);
      const product_updated =  await Product.update(
        { stock_quantity: stock },
        {
          where: {
            product_id: product_id
          },
          transaction: t 
        });
      const newOrderItem = await OrderItem.create({
        order_id: newOrder.order_id,
        product_id,
        quantity,
        price,
        lote,
        expiration_date,
        unit_id,
        type_movement_id,
        movement_type: "Out",
        subtotal,
        movement_id: newInventoryMovement.movement_id
      },{ transaction: t });
  }

   
    return { newOrder };
  });
   
    res.status(201).json({ 
      code: 1, 
      message: "Inventory movement created successfully", 
      content: result,
    });

  } catch (error) {
   
    res.status(500).json({ code: 0, message: "Error en consulta", content: error.message });
  }
});
// GET all inventory movements
router.get("/inventory_movements", async (req, res) => {
  try {
    const inventoryMovements = await InventoryMovement.findAll({ where: { active: true } });
    const serializedInventoryMovements = inventoryMovements.map(inventoryMovement => serialize(inventoryMovement));
    res.status(200).json({ code: 1, message: "OK", content: serializedInventoryMovements });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

// Serialize inventory movement data
function serialize(inventoryMovement) {
  return {
    inventory_movement_id: inventoryMovement.inventory_movement_id,
    product_id: inventoryMovement.product_id,
    movement_type: inventoryMovement.movement_type,
    quantity: inventoryMovement.quantity,
    created_at: inventoryMovement.created_at,
    updated_at: inventoryMovement.updated_at,
  };
}

// GET a specific inventory movement by ID
router.get("/inventory_movements/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const inventoryMovement = await InventoryMovement.findOne({
      where: {
        inventory_movement_id: id
      }
    });
    if (inventoryMovement) {
      res.status(200).json({ code: 1, message: "OK", content: inventoryMovement });
    } else {
      res.status(404).json({ code: 0, message: "Inventory movement not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

// CREATE a new inventory movement
router.post("/inventory_movements", async (req, res) => {
  try {
    const { product_id, movement_type, quantity } = req.body;
    const newInventoryMovement = await InventoryMovement.create({
      product_id,
      movement_type,
      quantity,
    });
    res.status(201).json({ code: 1, message: "Inventory movement created successfully", content: newInventoryMovement });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

// UPDATE an inventory movement
router.put("/inventory_movements/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, movement_type, quantity } = req.body;
    const updatedInventoryMovement = await InventoryMovement.update(
      { product_id, movement_type, quantity },
      {
        where: {
          inventory_movement_id: id
        }
      }
    );
    if (updatedInventoryMovement[0] === 1) {
      res.status(200).json({ code: 1, message: "Inventory movement updated successfully", content: "" });
    } else {
      res.status(404).json({ code: 0, message: "Inventory movement not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

// DELETE an inventory movement
router.delete("/inventory_movements/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInventoryMovement = await InventoryMovement.destroy({
      where: {
        inventory_movement_id: id
      }
    });
    if (deletedInventoryMovement === 1) {
      res.status(200).json({ code: 1, message: "Inventory movement deleted successfully", content: "" });
    } else {
      res.status(404).json({ code: 0, message: "Inventory movement not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

module.exports = router;