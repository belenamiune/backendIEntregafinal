import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
 products: {
  type: [
   {
    product: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "productos"
    },
    quantity: {
     type: Number,
     default: 1
    }
   },
  ],
  default: []
 }
});

cartsSchema.pre("find", function () {
 this.populate("products.product");
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);