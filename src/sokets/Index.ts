// Index.ts
import { Server, Socket } from "socket.io";
import { UserManager } from "#models/UserManager.js";
import MatchQueueManager from "#root/models/QueueManager.js";
import Sockets from "#root/sokets/Sockets.js";
import Player from "./Player.js";
import GameManager from "#root/models/GameManager.js";

class Index {
    private users: UserManager = new UserManager();
    private gameManager: GameManager = new GameManager();
    private matchQueue: MatchQueueManager = new MatchQueueManager();
    constructor(private io: Server) {
        this.io.on("connection", this.connection);

    }
    private connection = (socket: Socket) => {
        console.log(`New connection: ${socket.id}`);
        const sockets = new Sockets(socket, this.io);
        new Player(this.users, this.matchQueue, sockets, this.gameManager);
        sockets.disConnection(() => {
            this.users.remove(socket.id);
            this.matchQueue.remove(socket.id);
            sockets.updateUsers(this.users.list().map((user) => user.name));
            console.log(`User disconnected: ${socket.id}`);
        });
    }
}


export default Index;