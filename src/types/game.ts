export type Mark = "X" | "O";
export type Board = (Mark | null)[];
export interface PlayerInfo {
    id: string;          // socket.id
    name: string;
    inGame: boolean;
    gameId?: string;
}
export interface GameState {
    id: string;
    board: Board;        
    turn: Mark;         
    players: { you: string; oppnents: string }; 
    winner: Mark | null;
    createdAt: number;
}