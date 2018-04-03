import { Request, Response, Router } from "express";

class IndexRoute {
  public router: Router;

  constructor(public applicationRoutes: string[]) {
    this.router = Router();
    this.init();
  }

  public init() {
    this.router.route("").get((request: Request, response: Response) => {
      // replace with HATEOAS decorator
      const fullUrl = request.protocol + "://" + request.get("host");
      const meta = this.applicationRoutes.map((resourse: string) => {
        return {
          rel: resourse.replace(/\//g, ""),
          href: fullUrl + resourse
        };
      });
      response.json({links: meta});
    });
  }
}

export default IndexRoute;