import { productsModel } from "../models/products_model.js";

const getProducts = async (limit, page, query, sort) => {
    let filter = {};
    
    if (query) {
      filter = { title: { $regex: query.trim(), $options: "i" },  };
    }
  
    const sortOption = sort === "desc" ? { price: -1 } : { price: 1 };
  
    const result = await productsModel.paginate(filter, {
      limit: limit,
      page: page,
      sort: sortOption,
      lean: true
    });
  

    return {
      products: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/?limit=${limit}&page=${result.page - 1}&query=${query}` : null,
      nextLink: result.hasNextPage ? `/?limit=${limit}&page=${result.page + 1}&query=${query}` : null,
    };
  };

const getProductById = async (id) => {
 return await productsModel.find({ _id:id }).lean();
};

const addProduct = async (product) => {
 return await productsModel.create({...product});
};

const updateProduct = async (id, updatedData) => {
 return await productsModel.updateOne({_id: id}, updatedData);
};

const deleteProduct = async (id) => {
 const result = await productsModel.deleteOne({_id:id});
 return result.deletedCount > 0;
};

export default { getProducts, getProductById, addProduct, updateProduct, deleteProduct };