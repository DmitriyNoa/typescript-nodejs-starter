import Server from "./classes/Server";
import ArticlesRoute from "./routes/Articles.route";
import IndexRoute from "./routes/Index.route";
import UsersRoute from "./routes/Users.route";
const app = new Server(process.env.PORT || 8080);

const articles = new ArticlesRoute(app);

const index = new IndexRoute(app.getRoutes());
app.addRoute("/", index.router);

const users = new UsersRoute(app);

app.start();