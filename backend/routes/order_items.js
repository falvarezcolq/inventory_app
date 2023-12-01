const { Router } = require("express");
let router = Router();

const OrderItem = require("../models/order_item.js");

// GET all order items
router.get("/order_items", async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll({ where: { active: true } });
    const serializedOrderItems = orderItems.map(orderItem => serialize(orderItem));
    res.status(200).json({ codigo: 1, mensaje: "OK", contenido: serializedOrderItems });
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// Serialize order item data
function serialize(orderItem) {
  return {
    order_item_id: orderItem.order_item_id,
    product_id: orderItem.product_id,
    quantity: orderItem.quantity,
    created_at: orderItem.created_at,
    updated_at: orderItem.updated_at,
  };
}

// GET a specific order item by ID
router.get("/order_items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const orderItem = await OrderItem.findOne({
      where: {
        order_item_id: id
      }
    });
    if (orderItem) {
      res.status(200).json({ codigo: 1, mensaje: "OK", contenido: orderItem });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Order item not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// CREATE a new order item
router.post("/order_items", async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const newOrderItem = await OrderItem.create({
      product_id,
      quantity,
    });
    res.status(201).json({ codigo: 1, mensaje: "Order item created successfully", contenido: newOrderItem });
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// UPDATE an order item
router.put("/order_items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, quantity } = req.body;
    const updatedOrderItem = await OrderItem.update(
      { product_id, quantity },
      {
        where: {
          order_item_id: id
        }
      }
    );
    if (updatedOrderItem[0] === 1) {
      res.status(200).json({ codigo: 1, mensaje: "Order item updated successfully", contenido: "" });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Order item not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// DELETE an order item
router.delete("/order_items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrderItem = await OrderItem.destroy({
      where: {
        order_item_id: id
      }
    });
    if (deletedOrderItem === 1) {
      res.status(200).json({ codigo: 1, mensaje: "Order item deleted successfully", contenido: "" });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Order item not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

module.exports = router;