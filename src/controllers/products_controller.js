
import products_services from "../services/products_services.js";

export const getAllProducts = async (req, res) => {
 try {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const page = req.query.page && req.query.page >= 1 ? parseInt(req.query.page) : 1;
  const query = req.query.query ? req.query.query : "";
  const sort = req.query.sort ? req.query.sort : "asc";

  const { products, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage, prevLink, nextLink } = await products_services.getProducts(limit, page, query, sort);

  res.status(200).json({ status: "Success", payload: products, totalPages: totalPages, prevPage: prevPage, nextPage: nextPage, page: page, hasPrevPage: hasPrevPage, hasNextPage: hasNextPage, prevLink: prevLink, nextLink: nextLink});
 } catch (error) {
  res.status(400).json({ status: "Error"});
 }
};

export const getProductById = async (req, res) => {
 try {
  const product = await products_services.getProductById(req.params.id);

  if (!product) {
   return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({ status: "Success", payload: product});
 } catch (error) {

  res.status(500).json({ message: "Error to obtain the product", error });
 }
};

export const addProduct = async (req, res) => {
 try {
  const { title, description, code, price, stock, category, thumbnails } = req.body;
  const status = true;

  if (!title || !description || !code || !price || !stock || !category ) {
   return res.status(400).json({ message: "All the fields are mandatory" });
  }

  const createdProduct = await products_services.addProduct({ title, description, code, price, status, stock, category, thumbnails });

  res.status(201).json({ status: "success", payload: createdProduct });
 } catch (error) {

  res.status(500).json({ message: "Error adding the product", error });
 }
};

export const updateProduct = async (req, res) => {
 try {
  const { id } = req.params;
  const updatedData = req.body;

  const updateProduct = await products_services.updateProduct(id, updatedData);

  if (!updateProduct) {
   return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({ status: "success", payload: updateProduct });
 } catch(error) {

  res.status(500).json({ message: "Error modifying the product", error });
 }
};

export const deleteProduct = async (req, res) => {
 try {
  const isDeleted = await products_services.deleteProduct(req.params.id);

  if (!isDeleted) {
   return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({ "message": "Product deleted successfully" });

 } catch (error) {

  res.status(500).json({ message: "Error to delete the product", error });
 }
};