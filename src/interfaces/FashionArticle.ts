import Colors from "../enums/Colors";
import BaseArticle from "./BaseArticle";
import Sizes from "../enums/Sizes";

interface FashionArticle extends BaseArticle {
  size: Sizes;
  color: Colors;
}

export default FashionArticle;