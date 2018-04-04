import { Request, Response, Router } from "express";
import UsersService from "../classes/UsersService";
import User from "../classes/User";
import { RouteHandler, Get, Post } from "../decorators/RouteHandler";
import Server from "../classes/Server";

@RouteHandler("users")
export class UsersRoute {
  private usersService: UsersService = new UsersService();
  public router: any;

  constructor(public app: Server) {
  }

  @Get()
  public getUsers(req: Request, res: Response) {
    return res.send("Hello");
  }

  @Get("/:id")
  public getUserById(req: Request, res: Response) {
    return res.send("Hello " + req.params.id);
  }

  @Post()
  public getUserById(req: Request, res: Response) {
    return res.json(req.body);
  }
}

export default UsersRoute;