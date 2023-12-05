const { Router } = require("express");
let router = Router();

const Order = require("../models/order.js");

// GET all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { active: true } });
    const serializedOrders = orders.map(order => serialize(order));
    res.status(200).json({ code: 1, message: "OK", content: serializedOrders });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
    const { product_id, quantity } = req.body;
    const newOrder = await Order.create({
      product_id,
      quantity,
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
    const deletedOrder = await Order.destroy({
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