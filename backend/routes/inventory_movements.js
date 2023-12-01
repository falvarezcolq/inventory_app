const { Router } = require("express");
let router = Router();

const InventoryMovement = require("../models/inventory_movement.js");

// GET all inventory movements
router.get("/inventory_movements", async (req, res) => {
  try {
    const inventoryMovements = await InventoryMovement.findAll({ where: { active: true } });
    const serializedInventoryMovements = inventoryMovements.map(inventoryMovement => serialize(inventoryMovement));
    res.status(200).json({ codigo: 1, mensaje: "OK", contenido: serializedInventoryMovements });
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
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
      res.status(200).json({ codigo: 1, mensaje: "OK", contenido: inventoryMovement });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Inventory movement not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
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
    res.status(201).json({ codigo: 1, mensaje: "Inventory movement created successfully", contenido: newInventoryMovement });
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
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
      res.status(200).json({ codigo: 1, mensaje: "Inventory movement updated successfully", contenido: "" });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Inventory movement not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
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
      res.status(200).json({ codigo: 1, mensaje: "Inventory movement deleted successfully", contenido: "" });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Inventory movement not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

module.exports = router;