import { Request, Response, Router } from "express";
import UsersService from "../classes/UsersService";
import User from "../classes/User";

export class UsersRoute {
  public router: Router;
  private usersService: UsersService;

  constructor() {
    this.router = Router();
    this.usersService = new UsersService();
    this.router.route("/")
      .get(this.getUsers.bind(this));
  }

  public getUsers(req: Request, res: Response) {
    return this.usersService.getUsers()
      .then((response: User[]) => {
        return res.json(response);
      });
  }
}

export default UsersRoute;