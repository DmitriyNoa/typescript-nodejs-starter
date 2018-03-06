// put basic properties into abstract class.

import ArticleType from "../enums/ArticleType";
import BaseArticle from "../interfaces/BaseArticle";
import * as uuid from "uuid";
import Price from "../interfaces/Price";

abstract class AbstractActrticle implements BaseArticle {
  public SKU: string;
  constructor(public name: string, public type: ArticleType, public price: Price, SKU: string) {
    this.SKU = SKU ? SKU : uuid.v4();
  }
}

export default AbstractActrticle;