import ArticleType from "../enums/ArticleType";
import Price from "./Price";

interface BaseArticle {
  SKU: string;
  name: string;
  type: ArticleType;
  price: Price;
}

export default BaseArticle;