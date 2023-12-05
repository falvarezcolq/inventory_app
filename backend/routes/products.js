const { Router } = require("express");
let router = Router();

const Products = require("../models/product.js");

// GET all products
router.get("/products", async (req, res) => {
  try {
    const products = await Products.findAll({ where: { active: true } });
    const serializedProducts = products.map(product => serialize(product));
    res.status(200).json({ code: 1, message: "OK", content: serializedProducts });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

// Serialize product data
function serialize(product) {
  return {
      product_id:product.product_id,
      name:product.name,
      description:product.description,
      price:product.price,
      stock_quantity:product.stock_quantity,
      category_id:product.category_id,
      barcode:product.barcode,
      manufacturer:product.manufacturer,
      supplier_id:product.supplier_id,
      image_url:product.image_url,
      product_code:product.product_code,
      weight:product.weight,
      active:product.active,
      created_at:product.created_at,
      updated_at:product.updated_at,
  };
}

// GET a specific product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findOne({
      where: {
        product_id: id
      }
    });
    if (product) {
      res.status(200).json({ code: 1, message: "OK", content: product });
    } else {
      res.status(404).json({ code: 0, message: "Product not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

// CREATE a new product
router.post("/products", async (req, res) => {
  try {
    const { name, description, price, stock_quantity, category_id, barcode, manufacturer, supplier_id, product_code, weight,
    } = req.body;
    const newProduct = await Products.create({
      name,
      description,
      price,
      stock_quantity,
      category_id,
      barcode,
      manufacturer,
      supplier_id,
      product_code,
      weight,
    });
    res.status(201).json({ code: 1, message: "Product created successfully", content: newProduct });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

// UPDATE a product
router.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const updatedProduct = await Products.update(
      { name, price, description },
      {
        where: {
          product_id: id
        }
      }
    );
    if (updatedProduct[0] === 1) {
      res.status(200).json({ code: 1, message: "Product updated successfully", content: "" });
    } else {
      res.status(404).json({ code: 0, message: "Product not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

// DELETE a product
router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Products.destroy({
      where: {
        product_id: id
      }
    });
    if (deletedProduct === 1) {
      res.status(200).json({ code: 1, message: "Product deleted successfully", content: "" });
    } else {
      res.status(404).json({ code: 0, message: "Product not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

module.exports = router;