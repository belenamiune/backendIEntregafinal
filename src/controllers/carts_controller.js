import carts_services from "../services/carts_services.js";

export const getCarts = async (req, res) => {
 try {
  const carts = await carts_services.getCarts();

  res.status(200).json(carts);
 } catch (error) {

  res.status(500).json({ message: "Error to obtain the carts", error });
 };
};

export const getCartByIdController = async (req, res) => {
 try {
  const { cid } = req.params;
  const cart = await carts_services.getCartById(cid);

  if (!cart) {
   return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json(cart);
 } catch (error) {

  res.status(500).json({ message: "Error to obtain the cart", error });
 };
};

export const createCart = async (req, res) => {
 try {
  const newCart = await carts_services.createCart();

  res.status(201).json(newCart);
 } catch (error) {

  res.status(500).json({ message: "Error to create the cart", error });
 };
};

export const addProductToCartController = async (req, res) => {
 try {
  const { cid, pid } = req.params;

  const updatedCart = await carts_services.addProductToCart(cid, pid);

  if (!updatedCart) {
   return res.status(404).json({ message: "Cart not found" });
  };

  res.status(200).json(updatedCart);
 } catch (error) {

  res.status(500).json({ message: "Error to add the product to the cart", error });
 };
};

export const updateCartController = async (req, res) => {
 try{
  const { cid } = req.params;
  const { products } = req.body;
  const updatedCart = await carts_services.updateCart(cid, products);

  if (!updatedCart) {
   return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json(updatedCart);
 } catch(error) {
  
  res.status(500).json({ message: "Error to edit the product", error });
 }
};

export const updateProductQuantityController = async (req, res) => {
 try {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const updatedCart = await carts_services.updateProductQuantity(cid, pid, quantity);

  if (!updatedCart) {
   return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json(updatedCart);
 } catch(error) {

  res.status(500).json({ message: "Error to update the amount of the product", error });
 }
};

export const deleteAllProductsFromCartController = async (req, res) => {
 try {
  const { cid } = req.params;
  const cartCleared = await carts_services.clearCart(cid);

  if (!cartCleared) {
   return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json({ "message": "Cart empty successfully" });
 } catch (error) {

  res.status(500).json({ message: "Error to empty the cart", error });
 }
};

export const deleteProductFromCartController = async (req, res) => {
 try {
  const { cid, pid } = req.params;
  const updatedCart = await carts_services.deleteProductCart(cid, pid);

  if (!updatedCart) {
   return res.status(404).json({ message: "Produc not found" });
  }

  res.status(200).json(updatedCart);
 } catch (error) {

  res.status(500).json({ message: "Error to delete the product from the cart", error });
 }
};