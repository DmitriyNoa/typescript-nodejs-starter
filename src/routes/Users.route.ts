import { Request, Response, Router } from "express";
import UsersService from "../classes/UsersService";
import User from "../classes/User";
import { RouteHandler, Get, Post } from "../decorators/RouteHandler";
import Server from "../classes/Server";

@RouteHandler("users")
export class UsersRoute {
  public usersService: UsersService;
  public router: any;

  constructor(public app: Server) {
    console.log("Original constructor");
    this.usersService = new UsersService();
  }

  @Get()
  public getUsers(req: Request, res: Response) {
    return this.usersService.getUsers()
      .then((response: User[]) => {
        res.send(response);
      });
  }

  @Get("/:id")
  public getUserById(req: Request, res: Response) {
    return res.send("Hello " + req.params.id);
  }

  @Post()
  public postUser(req: Request, res: Response) {
    return res.json(req.body);
  }
}

export default UsersRoute;