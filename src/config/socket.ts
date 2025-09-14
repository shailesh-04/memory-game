// SocketServer.ts
import http, { Server as HttpServer } from "http";
import { Server } from "socket.io";
import App from "#config/app.js";
import Index from "#root/sokets/Index.js";

class SocketServer {
  public io: Server;
  public httpServer: HttpServer;
  constructor() {
    const app = new App().app;
    this.httpServer = http.createServer(app);
    this.io = new Server(this.httpServer, {
      cors: {
        origin: "*",
        credentials: true,
        methods: ["GET", "POST"],
      },
    });
    this.registerSockets();
  }
  private registerSockets() {
    new Index(this.io);
  }

}
export default SocketServer;
