import SinglePlayerGameStrategy from "./game-strategies/singleplayer-game-strategy"
import MultiPlayerGameStrategy from "./game-strategies/multiplayer-game-strategy"

class GameManager {
    private singlePlayerGameStrategy: SinglePlayerGameStrategy;
    private multiPlayerGameStrategy: MultiPlayerGameStrategy;

    constructor(gameMode: string) {
        if (gameMode === "singleplayer") {
            this.singlePlayerGameStrategy = new SinglePlayerGameStrategy;
        } else if (gameMode === "multiplayer") {
            this.multiPlayerGameStrategy = new MultiPlayerGameStrategy;
        }
    }

    destroy() {
        this.multiPlayerGameStrategy = null;
        this.singlePlayerGameStrategy = null;
    }
}

export {GameManager, }