const { Router } = require("express");
let router = Router();

const ProductImages = require("../models/product_image.js");

// GET all product images
router.get("/product_images", async (req, res) => {
  try {
    const productImages = await ProductImages.findAll({ where: { active: true } });
    const serializedProductImages = productImages.map(productImage => serialize(productImage));
    res.status(200).json({ codigo: 1, mensaje: "OK", contenido: serializedProductImages });
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// Serialize product image data
function serialize(productImage) {
  return {
    product_image_id: productImage.product_image_id,
    product_id: productImage.product_id,
    image_url: productImage.image_url,
    created_at: productImage.created_at,
    updated_at: productImage.updated_at,
  };
}

// GET a specific product image by ID
router.get("/product_images/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productImage = await ProductImages.findOne({
      where: {
        image_id: id
      }
    });
    if (productImage) {
      res.status(200).json({ codigo: 1, mensaje: "OK", contenido: productImage });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Product image not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// CREATE a new product image
router.post("/product_images", async (req, res) => {
  try {
    const { product_id, image_url } = req.body;
    const newProductImage = await ProductImages.create({
      product_id,
      image_url,
    });
    res.status(201).json({ codigo: 1, mensaje: "Product image created successfully", contenido: newProductImage });
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// UPDATE a product image
router.put("/product_images/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, image_url } = req.body;
    const updatedProductImage = await ProductImages.update(
      { product_id, image_url },
      {
        where: {
          product_image_id: id
        }
      }
    );
    if (updatedProductImage[0] === 1) {
      res.status(200).json({ codigo: 1, mensaje: "Product image updated successfully", contenido: "" });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Product image not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

// DELETE a product image
router.delete("/product_images/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProductImage = await ProductImages.destroy({
      where: {
        product_image_id: id
      }
    });
    if (deletedProductImage === 1) {
      res.status(200).json({ codigo: 1, mensaje: "Product image deleted successfully", contenido: "" });
    } else {
      res.status(404).json({ codigo: 0, mensaje: "Product image not found", contenido: "" });
    }
  } catch (error) {
    res.status(500).json({ codigo: 0, mensaje: "Error en consulta", contenido: "" });
  }
});

module.exports = router;