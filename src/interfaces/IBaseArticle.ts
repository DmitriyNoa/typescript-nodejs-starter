import ArticleType from "../enums/ArticleType";
import IPrice from "./IPrice";

interface IBaseArticle {
  SKU: string,
  name: string,
  type: ArticleType,
  price: IPrice
}

export default IBaseArticle;