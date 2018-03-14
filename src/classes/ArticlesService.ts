import * as express from "express";
import ArticleType from "../enums/ArticleType";
import Colors from "../enums/Colors";
import Shoe from "../classes/Shoe";
import Sizes from "../enums/Sizes";
import { ArticleModel } from "../schemas/FashionArticle.schema";
import FashionArticleModel from "../interfaces/FashionArticleModel";
import { Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller } from "tsoa";

@Route("Users")
class ArticlesService {

  @Get()
  public getArticles() {
    return ArticleModel.find()
      .then((articles: FashionArticleModel[]) => {
        return Promise.resolve(articles);
      })
      .catch((error: Error) => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  @Get("{id}")
  public getArticleById(id: string) {
    return ArticleModel
      .findById(id)
      .then((article: FashionArticleModel) => {
        return Promise.resolve(article);
      })
      .catch((error: Error) => {
        console.error(error);
        return Promise.reject(error);
      });
  }

}

export default ArticlesService;