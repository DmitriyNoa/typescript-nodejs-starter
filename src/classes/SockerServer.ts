import Server from "./Server";
import * as io from "socket.io";

class SocketServer extends Server {

  /* this.server of a parent Server class is protected property, so we can access it to add a socket.  */
  private socketServer = io(this.server);

  constructor(public port: number) {
    super(port);
    this.socketServer.on("connection", () => {
      console.log("New connection established");
    });

  }
}
export default SocketServer;