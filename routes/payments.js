const { Router } = require("express");
let router = Router();

const Payments = require("../models/payments.js");

// GET all payments
router.get("/payments", async (req, res) => {
  try {
    const payments = await Payments.findAll({ where: { active: true } });
    const serializedPayments = payments.map(payment => serialize(payment));
    res.status(200).json({ codigo: 1, mensaje: "OK", contenido: serializedPayments });
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// Serialize payment data
function serialize(payment) {
  return {
    payment_id: payment.payment_id,
    amount: payment.amount,
    date: payment.date,
    created_at: payment.created_at,
    updated_at: payment.updated_at,
  };
}

// GET a specific payment by ID
router.get("/payments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payments.findOne({
      where: {
        payment_id: id
      }
    });
    if (payment) {
      res.status(200).json({ codigo: 1, mensaje: "OK", contenido: payment });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Payment not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// CREATE a new payment
router.post("/payments", async (req, res) => {
  try {
    const { amount, date } = req.body;
    const newPayment = await Payments.create({
      amount,
      date,
    });
    res.status(201).json({ codigo: 1, mensaje: "Payment created successfully", contenido: newPayment });
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// UPDATE a payment
router.put("/payments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date } = req.body;
    const updatedPayment = await Payments.update(
      { amount, date },
      {
        where: {
          payment_id: id
        }
      }
    );
    if (updatedPayment[0] === 1) {
      res.status(200).json({ codigo: 1, mensaje: "Payment updated successfully", contenido: "" });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Payment not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// DELETE a payment
router.delete("/payments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await Payments.destroy({
      where: {
        payment_id: id
      }
    });
    if (deletedPayment === 1) {
      res.status(200).json({ codigo: 1, mensaje: "Payment deleted successfully", contenido: "" });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Payment not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

module.exports = router;