const { Router } = require("express");
let router = Router();

const Order = require("../models/order.js");

// GET all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { active: true } });
    const serializedOrders = orders.map(order => serialize(order));
    res.status(200).json({ codigo: 1, mensaje: "OK", contenido: serializedOrders });
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// Serialize order data
function serialize(order) {
  return {
    order_id: order.order_id,
    product_id: order.product_id,
    quantity: order.quantity,
    created_at: order.created_at,
    updated_at: order.updated_at,
  };
}

// GET a specific order by ID
router.get("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      where: {
        order_id: id
      }
    });
    if (order) {
      res.status(200).json({ codigo: 1, mensaje: "OK", contenido: order });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Order not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// CREATE a new order
router.post("/orders", async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const newOrder = await Order.create({
      product_id,
      quantity,
    });
    res.status(201).json({ codigo: 1, mensaje: "Order created successfully", contenido: newOrder });
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// UPDATE an order
router.put("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, quantity } = req.body;
    const updatedOrder = await Order.update(
      { product_id, quantity },
      {
        where: {
          order_id: id
        }
      }
    );
    if (updatedOrder[0] === 1) {
      res.status(200).json({ codigo: 1, mensaje: "Order updated successfully", contenido: "" });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Order not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// DELETE an order
router.delete("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.destroy({
      where: {
        order_id: id
      }
    });
    if (deletedOrder === 1) {
      res.status(200).json({ codigo: 1, mensaje: "Order deleted successfully", contenido: "" });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Order not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

module.exports = router;