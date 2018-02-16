import AbstractActrticle from "./AbstractArticle";
import ArticleType from "../enums/ArticleType";
import Colors from "../enums/Colors";
import IFashionArticle from "../interfaces/IFashionArticle";
import IPrice from "../interfaces/IPrice";
import Sizes from "../enums/Sizes";

class FashionArticle extends AbstractActrticle implements IFashionArticle {
  constructor(public name: string,
              public type: ArticleType,
              public size: Sizes,
              public color: Colors,
              public price: IPrice,
              SKU: string = "") {
    super(name, type, price, SKU);
  }
}

export default FashionArticle;