const express = require('express');
const Cart = require('../models/Cart.js');
const Product = require('../models/Products.js'); 
const router = express.Router();


// Crear un carrito vacío
router.post('/create', async (req, res) => {
  try {
    const newCart = new Cart({
      products: [] 
    });

    await newCart.save(); 

    res.json({ message: 'Carrito creado exitosamente', cartId: newCart._id });
  } catch (err) {
    console.error('Error al crear el carrito:', err);
    res.status(500).send('Error al crear el carrito');
  }
});


router.post('/add-product', async (req, res) => {
  console.log('Cuerpo de la solicitud:', req.body);  // Esto debería mostrar el cuerpo en consola

  const { productId, cartId } = req.body;

  if (!productId || !cartId) {
    return res.status(400).send('Faltan datos'); // Responde si falta algún dato
  }

  // Agregar el producto al carrito (lógica del carrito)
  try {
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    // Si el carrito existe, agregamos el producto
    cart.products.push({ productId });

    await cart.save();
    res.status(200).send('Producto agregado al carrito');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar producto al carrito');
  }
});




router.get('/view-cart', async (req, res) => {
  const cartId = '67af650f1cc8d55b68e3fbbd'; 

  try {
    const cart = await Cart.findById(cartId).populate('products.product');
    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    res.render("cart", { cart });
  } catch (err) {
    console.error('Error al obtener el carrito:', err);
    res.status(500).send('Error al obtener el carrito');
  }
});

module.exports = router;