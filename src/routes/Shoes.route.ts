import { Request, Response, Router } from "express";
import ArticleType from "../enums/ArticleType";
import Colors from "../enums/Colors";
import Shoe from "../classes/Shoe";
import Sizes from "../enums/Sizes";
import { ArticleModel } from "../schemas/FashionArticle.schema";
import FashionArticleModel from "../interfaces/FashionArticleModel";

class ArticlesRoute {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  // Putting all routes into one place makes it easy to search for specific functionality
  // As some methods will be called in a context of a different class instance, we need to bind thos methods to current class.

  public init() {
    this.router.route("/")
      .get(this.getArticles.bind(this))
      .post(this.createArticle.bind(this));

    this.router.route("/:id")
      .get(this.getArticleById.bind(this))
      .put(this.updateArticle.bind(this))
      .delete(this.deleteArticle.bind(this));
  }

  public getArticles(request: Request, response: Response): void {
    // I'm not a huge fan of JavaScript callbacks hell and expecially of using it in NodeJS, so I'll use promises instead.
    ArticleModel.find()
      .then((articles: FashionArticleModel[]) => {
        return response.json(articles);
      })
      .catch((errror: Error) => {
        console.error(errror);
      });
  }

  public getArticleById(request: Request, response: Response): void {
    const id = request.params.id;
    ArticleModel
      .findById(id)
      .then((article: FashionArticleModel) => {
        return response.json(article);
      })
      .catch((error: Error) => {
        console.error(error);
        return response.status(400).json({ error: error });
      });
  }

  public createArticle(request: Request, response: Response): void {
    const requestBody = request.body;
    const article = new Shoe(requestBody.name, requestBody.type, requestBody.size, requestBody.color, requestBody.price);

    const articeModel = new ArticleModel(article);

    articeModel
      .save()
      .then((createdArticle: FashionArticleModel) => {
        return response.json(createdArticle);
      })
      .catch((error: Error) => {
        console.error(error);
        return response.status(400).json({ error: error });
      });
  }

  public updateArticle(request: Request, response: Response): void {
    const id = request.params.id;
    const requestBody = request.body;
    const article = new Shoe(requestBody.name, requestBody.type, requestBody.size, requestBody.color, requestBody.price, requestBody.SKU);

    ArticleModel.findByIdAndUpdate(id, article)
      .then((updatedArticle: FashionArticleModel) => {
        return response.json(updatedArticle);
      })
      .catch((error: Error) => {
        console.error(error);
        return response.json({ err: error });
      });
  }

  public deleteArticle(request: Request, response: Response): void {
    const articleId = request.params.id;
    ArticleModel.findByIdAndRemove(articleId)
      .then((res: any) => {
        return response.status(204).end();
      })
      .catch((error: Error) => {
        console.error(error);
        return response.json({ error: error });
      });
  }
}

export default ArticlesRoute;