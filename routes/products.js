const express = require('express');
const router = express.Router();
const Product = require('../models/Products.js');

// Ruta para obtener productos con filtros, paginación y ordenamiento
router.get('/', async (req, res) => {
  try {
    let { limit = 10, page = 1, sort, query } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);
    const skip = (page - 1) * limit;

    let filter = {};
    if (query) {
      filter = { category: { $regex: query, $options: 'i' } };
    }

    let sortOption = {};
    if (sort === 'asc') sortOption.price = 1;
    if (sort === 'desc') sortOption.price = -1;

    const products = await Product.find(filter).lean().sort(sortOption).skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    res.render('products', { products, page, totalPages });
  } catch (error) {
    res.status(500).send('Error al obtener productos');
  }
});

module.exports = router;
