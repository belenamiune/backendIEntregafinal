const express = require('express');
const Product = require('../models/Products.js');  
const router = express.Router();


// Ruta GET para mostrar todos los productos
router.get('/add', (req, res) => {
  res.render('addProducts');
});

// Ruta GET con filtos
router.get('/', async (req, res) => {
  const { query = '', category = '', available = '', page = 1, limit = 10, sort = '' } = req.query;


  const filters = {};

  if (query) {
    filters.$or = [
      { name: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
    ];
  }

  if (category) {
    filters.category = category;
  }

  if (available !== '') {
    filters.available = available === 'true';
  }

  const sortOption = sort === 'desc' ? { price: -1 } : { price: 1 };

  try {
    const products = await Product.find(filters)
      .lean()
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));


    const totalProducts = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / limit);
    const prevPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    res.render('products', {
      products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink: prevPage ? `?page=${prevPage}&query=${query}&category=${category}&available=${available}` : null,
      nextLink: nextPage ? `?page=${nextPage}&query=${query}&category=${category}&available=${available}` : null,
      query,
      category,
      available,
      sort,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los productos');
  }
});



// Ruta GET para mostrar detalles del producto seleccionado
router.get('/:pid', async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).lean(); 
    console.log(product)
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }



    res.render('productDetail', { product });  
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).send('Error al obtener el producto');
  }
});


// Ruta POST para agregar un nuevo producto
router.post('/add', async (req, res) => {
  const { name, description, price, category, available } = req.body;

  if (!name || !description || !price || !category || available === undefined) {
    return res.status(400).send('Todos los campos son requeridos');
  }

  const newProduct = new Product({
    name,
    description,
    price,
    category,
    available: available === 'true' 
  });

  try {
    await newProduct.save();
    res.redirect('/products');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar el producto');
  }
});



module.exports = router;  