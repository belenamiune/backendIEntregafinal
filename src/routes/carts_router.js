import { Router } from "express";
import { getCarts, getCartByIdController, createCart, addProductToCartController, updateCartController, updateProductQuantityController, deleteAllProductsFromCartController, deleteProductFromCartController } from "../controllers/carts_controller.js";

const cartsRouter = Router();

cartsRouter.get("/", getCarts);
cartsRouter.get("/:cid", getCartByIdController);
cartsRouter.post("/", createCart);
cartsRouter.post("/:cid/product/:pid", addProductToCartController);
cartsRouter.put("/:cid", updateCartController);
cartsRouter.put("/:cid/product/:pid", updateProductQuantityController);
cartsRouter.delete("/:cid", deleteAllProductsFromCartController);
cartsRouter.delete("/:cid/product/:pid", deleteProductFromCartController);


export default cartsRouter;