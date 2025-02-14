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

  const { productId, cartId } = req.body;

  if (!productId || !cartId) {
    return res.status(400).send('Faltan datos');
  }

  try {
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    cart.products.push({ productId });

    await cart.save();
    res.redirect("/cart/" + cartId);
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



// Obtener carrito por ID 
router.get('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.productId').lean(); 

    if (!cart) {
      const defaultCartId = "67af650f1cc8d55b68e3fbbd";
      return res.redirect("/cart/${defaultCartId}");
    }

    res.render('cart', { cart });
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).send('Error al obtener el carrito');
  }
});


// Eliminar un producto específico del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    // Filtrar los productos para eliminar el que coincida con `pid`
    cart.products = cart.products.filter(p => p.productId.toString() !== pid);

    await cart.save();
    res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


router.delete('/:cid/clear', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    cart.products = [];
    await cart.save();

    res.status(200).json({ message: 'Carrito vaciado exitosamente' });
  } catch (error) {
    console.error('Error al vaciar el carrito:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;