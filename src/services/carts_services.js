import { cartsModel } from "../models/carts_model.js";

const getCarts = async () => {
 return await cartsModel.find().populate("products.product").lean();
};

const getCartById = async (id) => {
 return await cartsModel.findOne({ _id:id }).populate("products.product").lean();
};

const createCart = async () => {
 return await cartsModel.create({ products: [] });
};

const addProductToCart = async (cartId, productId) => {
 let cart = await cartsModel.findOne({ _id:cartId });
 let product = cart.products.find(item => item.product.equals(productId));

 if (product) {
  product.quantity += 1;
 } else {
  let product = { product: productId, quantity: 1 };
  cart.products.push(product);
 }

 return await cart.save();
};

const updateCart = async (cartId, products) => {
 return await cartsModel.updateOne({ _id: cartId }, { products });
};

const updateProductQuantity = async (cartId, productId, quantity) => {
 let cart = await cartsModel.findOne({ _id: cartId });
 let product = cart.products.find(item => item.product.equals(productId));

 if (product) {
  product.quantity = quantity;
 } else {
  return null;
 }

 return await cart.save();
};

const clearCart = async (cartId) => {
 return await cartsModel.updateOne({ _id: cartId }, { products: [] });
};

const deleteProductCart = async (cartId, productId) => {
 let cart = await cartsModel.findOne({ _id: cartId });
 cart.products = cart.products.filter(item => !item.product.equals(productId));

 return await cart.save();
};

export default { getCarts, getCartById, createCart, addProductToCart, updateCart, updateProductQuantity, clearCart, deleteProductCart };