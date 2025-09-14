export interface PlayerInfo {
    id: string;          // socket.id
    name: string;
    inGame: boolean;
    gameId?: string;
}
export class UserManager {
    private users = new Map<string, PlayerInfo>();
    upsert(id: string, name?: string) {
        const existed = this.users.get(id);
        const info: PlayerInfo = {
            id,
            name: name ?? existed?.name ?? `Player_${id.slice(0, 4)}`,
            inGame: existed?.inGame ?? false,
            gameId: existed?.gameId
        };
        this.users.set(id, info);
        return info;
    }
    setName(id: string, name: string) {
        const user = this.users.get(id);
        if (!user) return;
        user.name = name.trim() || user.name;
    }
    setGame(id: string, gameId?: string) {
        const user = this.users.get(id);
        if (!user) return;
        user.inGame = !!gameId;
        user.gameId = gameId;
    }
    remove(id: string) {
        this.users.delete(id);
    }
    list(): PlayerInfo[] {
        return [...this.users.values()];
    }
    get(id: string): PlayerInfo | undefined {
        return this.users.get(id);
    }
    has(id: string): boolean {
        return this.users.has(id);
    }
}
