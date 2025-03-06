import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/view_router.js";
import cartsRouter from "./routes/carts_router.js";
import productsRouter from "./routes/products_router.js";
import products_services from "./services/products_services.js";

const port = 5000;
const app = express();

const httpServer = app.listen(port, () => {
 console.log(`Server listening on http://localhost:${port}`);
});
const socketServer = new Server(httpServer);


app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://belen:123456be@mi-tienda.zjszo.mongodb.net/")
    . then(() => console.log('🟢 Connected to MongoDB Atlas'))
    .catch(err => console.error('🔴 Error to connect to MongoDB:', err));

app.use("/", viewsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

socketServer.on("connection", async socket => {
 
 const products = await products_services.getProducts();

 socket.emit("addproducts", products.products);

 socket.on("newProduct", async data => {
  await products_services.addProduct(data);

  const products = await products_services.getProducts();

  socket.emit("addproducts", products.products);
 });

 socket.on("deleteProduct", async data => {
  await products_services.deleteProduct(data);

  const products = await products_services.getProducts();

  socket.emit("addproducts", products.products);
 });
});