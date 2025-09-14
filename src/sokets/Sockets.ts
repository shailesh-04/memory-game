import { GameState } from "#root/models/GameManager.js";
import { PlayerInfo } from "#root/models/UserManager.js";
import { CallBackT } from "#root/types/Sockets.js";
import { Server, Socket } from "socket.io";

class Sockets {
    private socket: Socket;
    constructor(socket: Socket, private io: Server) {
        this.socket = socket;
    }
    get soket() {
        return this.socket;
    }
    get id() {
        return this.socket.id;
    }
    public disConnection = (callback: CallBackT) => {
        this.socket.on("disconnect", callback);
    }
    public updateUsers = (users: string[]) => {
        this.io.emit("users:update", users);
    }
    public joinGame = (callback: (name: string) => void) => {
        this.socket.on("player:joined", callback);
    }
    public matchmakingRequest = (callback: (info:
        { name: string; show: boolean; size: number; card: number }) => void) => {
        this.socket.on("matchmaking:request", callback);
    }
    public matchStart = (id: string, name: string, gameId: string) => {
        this.io.to(id).emit("matchmaking:response", {
            opponent: name,
            gameId
        });
        const socket = this.io.sockets.sockets.get(id);
        if (socket) socket.join(gameId);
    }
    public setPlayer = (id: string) => {
        this.io.to(id).emit("get:player", id);
    }
    public getGameState = (callback: (gameId: string) => void) => {
        this.socket.on("get:gameState", callback);
    }
    public joinRoom = (gameId: string) => {
        this.socket.join(gameId);
    };
    public updateGameState = (gameId: string, gameState: GameState) => {
        this.io.to(gameId).emit("update:gameState", { gameState });
    };
    public flipCard = (callback: (info: { gameId: string, player: string, cardId: number }) => void) => {
        this.socket.on("card:flip", callback);
    }

}
export default Sockets