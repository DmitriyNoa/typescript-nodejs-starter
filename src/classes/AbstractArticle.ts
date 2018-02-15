// put basic porperties into abstract class.

import ArticleType from "../enums/ArticleType";
import IBaseArticle from "../interfaces/IBaseArticle";
import * as uuid from "uuid";
import IPrice from "../interfaces/IPrice";

abstract class Abstractrticle implements IBaseArticle {
  public SKU: string;
  constructor(public name: string, public type: ArticleType, public price: IPrice, SKU: string) {
    this.SKU = SKU ? SKU : uuid.v4();
  }
}

export default Abstractrticle;