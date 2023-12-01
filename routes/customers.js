const { Router } = require("express");
let router = Router();

const Customers = require("../models/customers.js");

// GET all customers
router.get("/customers", async (req, res) => {
  try {
    const customers = await Customers.findAll({ where: { active: true } });
    const serializedCustomers = customers.map(customer => serialize(customer));
    res.status(200).json({ codigo: 1, mensaje: "OK", contenido: serializedCustomers });
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// Serialize customer data
function serialize(customer) {
  return {
    customer_id: customer.customer_id,
    name: customer.name,
    email: customer.email,
    created_at: customer.created_at,
    updated_at: customer.updated_at,
  };
}

// GET a specific customer by ID
router.get("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customers.findOne({
      where: {
        customer_id: id
      }
    });
    if (customer) {
      res.status(200).json({ codigo: 1, mensaje: "OK", contenido: customer });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Customer not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// CREATE a new customer
router.post("/customers", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newCustomer = await Customers.create({
      name,
      email,
    });
    res.status(201).json({ codigo: 1, mensaje: "Customer created successfully", contenido: newCustomer });
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// UPDATE a customer
router.put("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedCustomer = await Customers.update(
      { name, email },
      {
        where: {
          customer_id: id
        }
      }
    );
    if (updatedCustomer[0] === 1) {
      res.status(200).json({ codigo: 1, mensaje: "Customer updated successfully", contenido: "" });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Customer not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// DELETE a customer
router.delete("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCustomer = await Customers.destroy({
      where: {
        customer_id: id
      }
    });
    if (deletedCustomer === 1) {
      res.status(200).json({ codigo: 1, mensaje: "Customer deleted successfully", contenido: "" });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Customer not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

module.exports = router;