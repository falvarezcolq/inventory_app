const { Router } = require("express");
let router = Router();

const Customers = require("../models/customers.js");

// GET all customers
router.get("/customers", async (req, res) => {
  try {
    const customers = await Customers.findAll({ where: { active: true } });
    const serializedCustomers = customers.map(customer => serialize(customer));
    res.status(200).json({ code: 1, message: "OK", content: serializedCustomers });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
      res.status(200).json({ code: 1, message: "OK", content: customer });
    } else {
      res.status(404).json({ code: 0, message: "Customer not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
    res.status(201).json({ code: 1, message: "Customer created successfully", content: newCustomer });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
      res.status(200).json({ code: 1, message: "Customer updated successfully", content: "" });
    } else {
      res.status(404).json({ code: 0, message: "Customer not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
      res.status(200).json({ code: 1, message: "Customer deleted successfully", content: "" });
    } else {
      res.status(404).json({ code: 0, message: "Customer not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

module.exports = router;