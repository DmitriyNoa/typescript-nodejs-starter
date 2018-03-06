import AbstractActrticle from "./AbstractArticle";
import ArticleType from "../enums/ArticleType";
import Colors from "../enums/Colors";
import FashionArticle from "../interfaces/FashionArticle";
import Price from "../interfaces/Price";
import Sizes from "../enums/Sizes";

class Shoe extends AbstractActrticle implements FashionArticle {
  constructor(public name: string,
              public type: ArticleType,
              public size: Sizes,
              public color: Colors,
              public price: Price,
              SKU: string = "") {
    super(name, type, price, SKU);
  }
}

export default Shoe;