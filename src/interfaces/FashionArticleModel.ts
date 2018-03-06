import { Document } from "mongoose";
import FashionArticle from "./FashionArticle";

interface FashionArticleModel extends FashionArticle, Document {}
export default FashionArticleModel;