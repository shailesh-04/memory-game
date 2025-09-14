import { generateId } from "#root/utils/game.js";

export interface Card {
    id: number;
    value: string | null; // null until revealed
    revealed: boolean;
    matched: boolean;
}

export interface GameState {
    id: string;
    board: Card[]; // Clients only see placeholders or revealed cards
    players: { player1: string; player2: string };
    currentTurn: string;
    scores: { [player: string]: number };
    hide: boolean;
    boardSize: number;
    type: number;
    createdAt: number;
}

class GameManager {
    private games: Map<string, GameState> = new Map();
    private hiddenCards: Map<string, string[]> = new Map(); // real card values, private

    createGame(player1: string, player2: string, hide: boolean, boardSize: number, type: number): string {
        const id = generateId("game");
        const { placeholders, values } = this.generateBoard(boardSize, type);

        const gameState: GameState = {
            id,
            board: placeholders,
            players: { player1, player2 },
            currentTurn: player1,
            scores: { [player1]: 0, [player2]: 0 },
            hide,
            boardSize,
            type,
            createdAt: Date.now()
        };

        this.games.set(id, gameState);
        this.hiddenCards.set(id, values);

        return id;
    }

    getGame(id: string): GameState | undefined {
        return this.games.get(id);
    }

    flipCard(gameId: string, player: string, cardId: number): GameState | undefined {
        const game = this.games.get(gameId);
        const values = this.hiddenCards.get(gameId);
        if (!game || !values || game.currentTurn !== player) return;

        const card = game.board.find(c => c.id === cardId);
        if (!card || card.revealed || card.matched) return game;

        // Reveal this card
        card.revealed = true;
        card.value = values[cardId];

        const revealedCards = game.board.filter(c => c.revealed && !c.matched);
        if (revealedCards.length === 2) {
            const [c1, c2] = revealedCards;
            if (c1.value === c2.value) {
                c1.matched = true;
                c2.matched = true;
                game.scores[player]++;

                const allMatched = game.board.every(c => c.matched);
                if (allMatched) {
                    // Reset game with a new board
                    const { placeholders, values: newValues } = this.generateBoard(game.boardSize, game.type);
                    game.board = placeholders;
                    this.hiddenCards.set(gameId, newValues);
                }
            } else {
                game.currentTurn = game.currentTurn === game.players.player1
                    ? game.players.player2
                    : game.players.player1;
            }
        }

        return game;
    }

    hideRevealedCards(gameId: string): GameState | undefined {
        const game = this.games.get(gameId);
        if (!game) return;

        const revealedCards = game.board.filter(c => c.revealed && !c.matched);
        if (revealedCards.length < 2) return;

        revealedCards.forEach(c => {
            c.revealed = false;
            c.value = null; // Hide value again
        });

        return game;
    }

    private generateBoard(size: number, type: number): { placeholders: Card[], values: string[] } {
        const emojis: string[][] = [
            ["😁", "😘", "😈", "🎃", "😡", "😎", "🥰", "🤯", "😂", "😛"],
            ["💐", "🌹", "🥀", "🌷", "🌺", "🌸", "🏵️", "🌻", "🌼", "💮"],
            ["🍓", "🍒", "🍎", "🍉", "🍑", "🍊", "🥭", "🍍", "🍌", "🍋"],
            ["❤️", "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💔", "❣️"],
            ["🐵", "🦁", "🐯", "🐱", "🐶", "🐺", "🐻", "🐨", "🐼", "🐹"],
            ["🌼", "😘", "💘", "🐶", "🌺", "😎", "🌹", "🍒", "💔", "🐹"]
        ];

        let noOfCards = 6;
        if (size === 1) noOfCards = 12;
        if (size === 2) noOfCards = 20;

        const selectedEmojis = emojis[type];
        const values: string[] = [];
        for (let i = 0; i < noOfCards; i++) {
            values.push(selectedEmojis[i % (noOfCards / 2)]);
        }
        values.sort(() => Math.random() - 0.5);

        const placeholders: Card[] = values.map((_, idx) => ({
            id: idx,
            value: null, // Hide by default
            revealed: false,
            matched: false
        }));

        return { placeholders, values };
    }

    removeGame(id: string): void {
        this.games.delete(id);
        this.hiddenCards.delete(id);
    }
}

export default GameManager;
