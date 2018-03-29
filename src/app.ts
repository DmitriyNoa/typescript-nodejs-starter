import Server from "./classes/Server";
import ArticlesRoute from "./routes/Shoes.route";
import IndexRoute from "./routes/Index.route";
const app = new Server(process.env.PORT || 8080);

const articles = new ArticlesRoute();
app.addRoute("/articles", articles.router);

const index = new IndexRoute(app.getRoutes());
app.addRoute("/", index.router);

app.start();