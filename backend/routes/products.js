const { Router } = require("express");
let router = Router();
const { Op } = require("sequelize");

const Products = require("../models/product.js");
const Unit = require("../models/unit.js");

// GET all products
router.get("/products", async (req, res) => {
  try {
    const { page, limit, name } = req.query;
    const offset = (page - 1) * limit;
    const whereClause = name ? { active: true, name: { [Op.like]: `%${name}%` } } : { active: true };
    const products = await Products.findAll(
      { where: whereClause, offset, limit,
        order: [["name", "ASC"]] }
      
      );
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
      purchase_price:product.purchase_price,
      price:product.price,
      stock_quantity:product.stock_quantity,
      category_id:product.category_id,
      barcode:product.barcode,
      manufacturer:product.manufacturer,
      supplier_id:product.supplier_id,
      unit_id:product.unit_id,
      unit_abbreviation:product.unit_abbreviation,
      image_url:(product.image_url != null) ? process.env.URL + product.image_url : null,
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
      res.status(200).json({ code: 1, message: "OK", content: serialize(product) });
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
    const { name, description, purchase_price,  price, stock_quantity, barcode, manufacturer, category_id, supplier_id, unit_id, unit_abbreviation, product_code, weight,
    } = req.body;
   
    const newProduct = await Products.create({
      name,
      description,
      purchase_price, 
      price,
      // stock_quantity,
      barcode,
      manufacturer,
      category_id,
      supplier_id,
      unit_id,
      unit_abbreviation,
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
    const { name, description, purchase_price,  price, stock_quantity, barcode, manufacturer, category_id, supplier_id, unit_id, unit_abbreviation, product_code, weight,
    } = req.body;
    const unit = await Unit.findOne({
      where: {
        unit_id: unit_id
      }
    });
    const updatedProduct = await Products.update(
      { name, description, purchase_price,  price, 
        // stock_quantity, 
        barcode, manufacturer, category_id, supplier_id, 
        unit_id, 
        unit_abbreviation, 
        product_code, weight,
      },
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