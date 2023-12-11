const { Router } = require("express");
const fileUpload = require('express-fileupload');


let router = Router();
router.use(fileUpload());
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const Product = require("../models/product.js");
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



router.post('/product_images', async (req, res) => {
  try {
    let { product_id } = req.body;
    const uploadedFile = req.files.archivo;
    if (!req.files || Object.keys(req.files).length === 0 ) {
      return res.status(400).send('No files were uploaded.');
    }
   
    if ( uploadedFile.size > 2050000 ) {
      return res.status(400).send('El archivo excede el tamaño permitido max 2MB.');
    }
    let hash_name = uuidv4( `${product_id}$#@$`)
    let namesplit = uploadedFile.name.split(".")
    let file_name=hash_name+".jpg"
    let project_images_path = "/images/products/"+product_id+"/";
    const ruta_directorio = path.join(process.env.URL_SERVER_FILE,project_images_path);
    if(!fs.existsSync(ruta_directorio)){
      fs.mkdirSync(ruta_directorio,{ recursive:true });
    }
    const uploadPath = path.join(process.env.URL_SERVER_FILE, project_images_path,file_name);    
    
    const newProductImage = await ProductImages.create({
      product_id,
      image_url: project_images_path+file_name,
    });
    const product = await Product.update({  
      image_url: project_images_path+file_name,
    }, {
      where: { product_id: product_id } 
    });
    uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).send(err);
      } 
      return res.status(200).json({ codigo: 1, mensaje: "Consulta exitosa" })
    });

  } catch (error) {
    res.status(500).json({
      codigo: 0,
      mensaje: "Error en consulta",
      contenido: ""
    });
  }
});




// // DELETE a product image
// router.delete("/product_images/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedProductImage = await ProductImages.destroy({
//       where: {
//         product_image_id: id
//       }
//     });
//     if (deletedProductImage === 1) {
//       res.status(200).json({ code: 1, message: "Product image deleted successfully", content: "" });
//     } else {
//       res.status(404).json({ code: 0, message: "Product image not found", content: "" });
//     }
//   } catch (error) {
//     res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
//   }
// });

module.exports = router;