const { Router } = require("express");
let router = Router();

const ProductImages = require("../models/product_image.js");

// GET all product images
router.get("/product_images", async (req, res) => {
  try {
    const productImages = await ProductImages.findAll({ where: { active: true } });
    const serializedProductImages = productImages.map(productImage => serialize(productImage));
    res.status(200).json({ code: 1, message: "OK", content: serializedProductImages });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
      res.status(200).json({ code: 1, message: "OK", content: productImage });
    } else {
      res.status(404).json({ code: 0, message: "Product image not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
    res.status(201).json({ code: 1, message: "Product image created successfully", content: newProductImage });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
      res.status(200).json({ code: 1, message: "Product image updated successfully", content: "" });
    } else {
      res.status(404).json({ code: 0, message: "Product image not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
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
      res.status(200).json({ code: 1, message: "Product image deleted successfully", content: "" });
    } else {
      res.status(404).json({ code: 0, message: "Product image not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

module.exports = router;