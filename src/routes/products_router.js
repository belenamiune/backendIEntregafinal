import { Router } from "express";
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/products_controller.js";

const productsRouter =  Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);
productsRouter.post("/", addProduct);
productsRouter.put("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);

export default productsRouter;