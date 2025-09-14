import { UserManager } from "#models/UserManager.js";
import GameManager from "#root/models/GameManager.js";
import MatchQueueManager from "#root/models/QueueManager.js";
import Sockets from "./Sockets.js";

class Player {
  constructor(
    private users: UserManager,
    private matchQueue: MatchQueueManager,
    private socket: Sockets,
    private gameManager: GameManager
  ) {
    this.handleJoinGame();
    this.handleMatchStart();
  }
  private handleJoinGame() {
    this.socket.joinGame((name: string) => {
      this.users.upsert(this.socket.id, name);
      this.socket.setPlayer(this.socket.id);
      this.handleMatchmakingRequest();
      this.broadcastPresence();
    });
  }
  private broadcastPresence() {
    this.socket.updateUsers(this.users.list().map((user) => user.name));
  }
  private handleMatchmakingRequest() {
    this.socket.matchmakingRequest((info: { name: string; show: boolean; size: number; card: number }) => {
      this.matchQueue.add(this.socket.id, info.name, info.show, info.size, info.card);
      console.log(`${info.name} joined matchmaking`);
      const match = this.matchQueue.findMatch(this.socket.id);
      if (match) {
        const { opponent, opponentId } = match;
        console.log(`Match found between ${info.name} and ${opponent.name}`);
        const gameId = this.gameManager.createGame(info.name, opponent.name, info.show, info.size, info.card);
        this.socket.matchStart(this.socket.id, opponent.name, gameId);
        this.socket.matchStart(opponentId, info.name, gameId);
        this.matchQueue.remove(this.socket.id);
        this.matchQueue.remove(opponentId);
      }
    });
  }
  private handleMatchStart() {
    this.socket.getGameState((gameId: string) => {
      const state = this.gameManager.getGame(gameId);
      if (!state) return;
      if (state.id !== gameId) return;
      this.socket.joinRoom(gameId);
      this.socket.updateGameState(gameId,state);
    });
    this.socket.flipCard((info: { gameId: string, player: string, cardId: number }) => {
      if (info.player !== this.socket.id) return;
      const playerName = this.users.get(info.player)?.name;
      if (!playerName) return;
      const state = this.gameManager.flipCard(info.gameId, playerName, info.cardId);
      if (!state) return;
      this.socket.updateGameState(info.gameId,state);
      setTimeout(() => {
        const state = this.gameManager.hideRevealedCards(info.gameId);
        this.socket.updateGameState(info.gameId,state);
      }, 2000)
    });
  }

}


export default Player;