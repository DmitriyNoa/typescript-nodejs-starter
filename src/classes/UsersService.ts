import { Get, Route, Controller, Tags } from "tsoa";
import User from "./User";

@Route("users")
@Tags("Users")
class UsersService extends Controller {

  @Get()
  getUsers(): Promise<User[]> {
    const users = [{name: "John Doe", email: "test@test.com"}];
    return Promise.resolve(users);
  }

}

export default UsersService;
