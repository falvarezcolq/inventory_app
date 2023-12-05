const { Router } = require("express");
let router = Router();

const OrderItem = require("../models/order_item.js");

// GET all order items
router.get("/order_items", async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll({ where: { active: true } });
    const serializedOrderItems = orderItems.map(orderItem => serialize(orderItem));
    res.status(200).json({ code: 1, message: "OK", content: serializedOrderItems });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
      res.status(200).json({ code: 1, message: "OK", content: orderItem });
    } else {
      res.status(404).json({ code: 0, message: "Order item not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
    res.status(201).json({ code: 1, message: "Order item created successfully", content: newOrderItem });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
      res.status(200).json({ code: 1, message: "Order item updated successfully", content: "" });
    } else {
      res.status(404).json({ code: 0, message: "Order item not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
      res.status(200).json({ code: 1, message: "Order item deleted successfully", content: "" });
    } else {
      res.status(404).json({ code: 0, message: "Order item not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

module.exports = router;