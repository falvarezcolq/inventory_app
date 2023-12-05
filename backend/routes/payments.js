const { Router } = require("express");
let router = Router();

const Payments = require("../models/payments.js");

// GET all payments
router.get("/payments", async (req, res) => {
  try {
    const payments = await Payments.findAll({ where: { active: true } });
    const serializedPayments = payments.map(payment => serialize(payment));
    res.status(200).json({ code: 1, message: "OK", content: serializedPayments });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
      res.status(200).json({ code: 1, message: "OK", content: payment });
    } else {
      res.status(404).json({ code: 0, message: "Payment not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
    res.status(201).json({ code: 1, message: "Payment created successfully", content: newPayment });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
      res.status(200).json({ code: 1, message: "Payment updated successfully", content: "" });
    } else {
      res.status(404).json({ code: 0, message: "Payment not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
      res.status(200).json({ code: 1, message: "Payment deleted successfully", content: "" });
    } else {
      res.status(404).json({ code: 0, message: "Payment not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

module.exports = router;