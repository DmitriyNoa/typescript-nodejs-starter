import Colors from "../enums/Colors";
import IBaseArticle from "./IBaseArticle";
import Sizes from "../enums/Sizes";

interface IFashionArticle extends IBaseArticle {
  size: Sizes,
  color: Colors
}

export default IFashionArticle;