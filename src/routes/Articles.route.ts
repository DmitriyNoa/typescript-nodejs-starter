import { Request, Response, Router } from "express";
import FashionArticleModel from "../interfaces/FashionArticleModel";
import ArticlesService from "../classes/ArticlesService";
import { RouteHandler, Get, Post, Put, Delete } from "../decorators/RouteHandler";
import Server from "../classes/Server";

@RouteHandler("/articles")
class ArticlesRoute {
  public router: Router;
  private articlesService: ArticlesService;

  constructor(public app: Server) {
    this.articlesService = new ArticlesService();
  }

  @Get()
  public getArticles(request: Request, response: Response): void {
    // I'm not a huge fan of JavaScript callbacks hell and expecially of using it in NodeJS, so I'll use promises instead.
    this.articlesService.getArticles()
      .then((articles: FashionArticleModel[]) => {
        return response.json(articles);
      })
      .catch((errror: Error) => {
        console.error(errror);
      });
  }

  @Get("/:id")
  public getArticleById(request: Request, response: Response): void {
    const id = request.params.id;
    this.articlesService.getArticleById(id)
      .then((article: FashionArticleModel) => {
        return response.json(article);
      })
      .catch((error: Error) => {
        console.error(error);
        return response.status(400).json({ error: error });
      });
  }

  @Post()
  public createArticle(request: Request, response: Response): void {
    this.articlesService.createArticle(request.body)
      .then((createdArticle: FashionArticleModel) => {
        return response.json(createdArticle);
      })
      .catch((error: Error) => {
        console.error(error);
        return response.status(400).json({ error: error });
      });
  }

  @Put(":/id")
  public updateArticle(request: Request, response: Response): void {
    const id = request.params.id;
    const requestBody = request.body;

    this.articlesService.updateArticle(id, requestBody)
      .then((updatedArticle: FashionArticleModel) => {
        return response.status(204).end();
      })
      .catch((error: Error) => {
        console.error(error);
        return response.json({ err: error });
      });
  }

  @Delete("/:id")
  public deleteArticle(request: Request, response: Response): void {
    const articleId = request.params.id;
   this.articlesService.deleteArticle(articleId)
      .then(() => {
        return response.status(204).end();
      })
      .catch((error: Error) => {
        console.error(error);
        return response.json({ error: error });
      });
  }
}

export default ArticlesRoute;