import { Document } from "mongoose";
import IFashionArticle from "./IFashionArticle";

interface IFashionArticleModel extends IFashionArticle, Document {};
export default IFashionArticleModel;