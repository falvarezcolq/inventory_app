const { Router } = require("express");
let router = Router();

const Products = require("../models/product.js");

// GET all products
router.get("/products", async (req, res) => {
  try {
    const products = await Products.findAll({ where: { active: true } });
    const serializedProducts = products.map(product => serialize(product));
    res.status(200).json({ codigo: 1, mensaje: "OK", contenido: serializedProducts });
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
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
      res.status(200).json({ codigo: 1, mensaje: "OK", contenido: product });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Product not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
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
    res.status(201).json({ codigo: 1, mensaje: "Product created successfully", contenido: newProduct });
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
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
      res.status(200).json({ codigo: 1, mensaje: "Product updated successfully", contenido: "" });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Product not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
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
      res.status(200).json({ codigo: 1, mensaje: "Product deleted successfully", contenido: "" });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Product not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

module.exports = router;