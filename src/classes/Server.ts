import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as logger from "morgan";
/* Create a reusable server class that will bootstrap basic express application. */
 class Server {

  /* Most of the core properties belove have their types defined by already existing interfaces. IDEs users can jump directly to   interface definition by clicking on its name.  */
  /* protected member will be accessible from deriving classes.  */
  protected app: express.Application;
  /* And here we are using http module Server class as a type. */
  protected server: http.Server;

  private db: mongoose.Connection;

  /* restrict member scope to Server class only */
  private routes: string[] = [];

  /* public modifier is a default and can be omitted. I prefer to always set it, so code  style is more consistent. */
  public port: number | string;

  constructor(port: number | string = 3000) {
    this.app = express();
    this.port = port;
    this.app.set("port", port);
    this.config();
    this.database();
  }

  private config() {
    // set bodyParser middleware to get form data
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    // HTTP requests logger
    this.app.use(logger("dev"));
    this.server = http.createServer(this.app);

    if (!process.env.PRODUCTION) {
      dotenv.config({ path: ".env.dev" });
    }
  }

  public addRoute(routeUrl: string, routerHandler: express.Router): void {
    if (this.routes.indexOf(routeUrl) === -1) {
      this.routes.push(routeUrl);
      this.app.use(routeUrl, routerHandler);
    }
  }

  public getRoutes(): string[] {
    return this.routes;
  }

  private database(): void {
    mongoose.connect(process.env.MONGODB_URI);
    this.db = mongoose.connection;
    this.db.once("open", () => {
      console.log("Database started");
    });
    mongoose.connection.on("error", () => {
      console.log("MongoDB connection error. Please make sure MongoDB is running.");
      process.exit();
    });
  }

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(("  App is running at http://localhost:%d in %s mode"), this.app.get("port"), this.app.get("env"));
      console.log("  Press CTRL-C to stop\n");
    });
  }
}

export default Server;