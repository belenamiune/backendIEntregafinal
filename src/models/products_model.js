import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "productos";

const productsSchema = new mongoose.Schema({
 title: String,
 description: String,
 price: Number,
 status: Boolean,
 stock: Number,
 category: String,
 thumbnails: Array,
 code: String
});

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, productsSchema);