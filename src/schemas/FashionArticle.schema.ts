import { Schema, Model, model} from "mongoose";
import IFashionArticleModel from "../interfaces/IFashionArticleModel";

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

const ArticleModel: Model<IFashionArticleModel> = model<IFashionArticleModel>("Article", ArticleSchema);
export {ArticleModel};