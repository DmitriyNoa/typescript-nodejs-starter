import Shoe from "../classes/Shoe";
import { ArticleModel } from "../schemas/FashionArticle.schema";
import FashionArticle from "../interfaces/FashionArticle";
import FashionArticleModel from "../interfaces/FashionArticleModel";
import { Get, Post, Route, Put, Body, Delete } from "tsoa";
import { Validate } from "../decorators/Validate";
import HATEOAS from "../decorators/HATEOAS";

@Route("articles")
class ArticlesService {

  @Get()
  @HATEOAS("articles")
  public getArticles(): Promise<FashionArticle[]> {
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
  public getArticleById(id: string): Promise<FashionArticle> {
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

  @Post()
  @Validate([
    {
      param: "name",
      validate: "required"
    }
  ])
  public createArticle(@Body() requestBody: FashionArticle): Promise<FashionArticle> {
    const article = new Shoe(requestBody.name, requestBody.type, requestBody.size, requestBody.color, requestBody.price);
    const articeModel = new ArticleModel(article);

    return articeModel
      .save()
      .then((createdArticle: FashionArticleModel) => {
        return Promise.resolve(createdArticle);
      })
      .catch((error: Error) => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  @Put("{id}")
  public updateArticle(id: string, @Body() requestBody: FashionArticle): Promise<FashionArticle> {
    const article = new Shoe(requestBody.name, requestBody.type, requestBody.size, requestBody.color, requestBody.price, requestBody.SKU);

    return ArticleModel.findByIdAndUpdate(id, article)
      .then((updatedArticle: FashionArticleModel) => {
        return Promise.resolve(updatedArticle);
      })
      .catch((error: Error) => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  @Delete("{id}")
  public deleteArticle(id: string): Promise<void> {

    return ArticleModel.findByIdAndRemove(id)
      .then((res: any) => {
        return Promise.resolve();
      })
      .catch((error: Error) => {
        console.error(error);
        return Promise.reject(error);
      });
  }
}

export default ArticlesService;