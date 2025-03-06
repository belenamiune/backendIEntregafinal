import { Router } from "express";
import carts_services from "../services/carts_services.js";
import products_services from "../services/products_services.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
 const { limit, page, query, sort } = req.query;
 const products = await products_services.getProducts(limit, page, query, sort);

 res.render("home", { title: "Library", products });
});

viewsRouter.get("/products", async (req, res) => {
 const { limit, page, query, sort } = req.query;
 const products = await products_services.getProducts(limit, page, query, sort);

 res.render("home", { title: "Products", products });
});

viewsRouter.get("/products/:pid", async (req, res) => {
 const product = await products_services.getProductById(req.params.pid);

 res.render("product", { title: "Product Details", product });
});

viewsRouter.get("/addproducts", (req, res) => {
 res.render("addproducts", { title: "Add Products"});
});

viewsRouter.get("/carts/:cid", async (req, res) => {
 const cart = await carts_services.getCartById(req.params.cid);

 res.render("cart", { title: "Cart Details", cart });
});

export default viewsRouter;