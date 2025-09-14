
export interface MatchQueueType {
    userId: string;
    show: boolean;
    size: number;
    card: number;
    name: string;
}
class MatchQueueManager {
    private matchQueue = new Map<string, MatchQueueType>();
    public remove(id: string) {
        this.matchQueue.delete(id);
    }
    public get(id: string): MatchQueueType | undefined {
        return this.matchQueue.get(id);
    }
    public add(id: string, name: string, show: boolean, size: number, card: number) {
        this.matchQueue.set(id, { userId: id, name, show, size, card });
    }
    public list(): MatchQueueType[] {
        return [...this.matchQueue.values()];
    }
    public clear() {
        this.matchQueue.clear();
    }
    public findMatch(currentId: string): { opponentId: string; opponent: MatchQueueType } | null {
        const currentPlayer = this.matchQueue.get(currentId);
        if (!currentPlayer) return null;
        for (const [id, player] of this.matchQueue.entries()) {
            if (
                id !== currentId && 
                player.size === currentPlayer.size &&
                player.card === currentPlayer.card
            ) {
                return { opponentId: id, opponent: player };
            }
        }

        return null;
    }
}
export default MatchQueueManager