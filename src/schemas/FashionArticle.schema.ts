import { Schema, Model, model } from "mongoose";
import FashionArticleModel from "../interfaces/FashionArticleModel";

const ArticleSchema: Schema = new Schema({
  name: String,
  type: Number,
  size: String,
  color: Number,
  price: {
    price: Number,
    basePrice: Number
  },
  SKU: String
});

// Use Model generic from mongoose to create a model of IFashionArticle type.
const ArticleModel: Model<FashionArticleModel> = model<FashionArticleModel>("Article", ArticleSchema);
export {ArticleModel};