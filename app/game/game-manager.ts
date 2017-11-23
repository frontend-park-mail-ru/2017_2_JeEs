import SinglePlayerGameStrategy from "./game-strategies/singleplayer-game-strategy"
import MultiPlayerGameStrategy from "./game-strategies/multiplayer-game-strategy"

class GameManager {
    private singlePlayerGameStrategy: SinglePlayerGameStrategy;
    private multiPlayerGameStrategy: MultiPlayerGameStrategy;

    constructor(gameMode: string) {
        if (gameMode === "singleplayer") {
            this.singlePlayerGameStrategy = new SinglePlayerGameStrategy;
            window.sessionStorage.setItem("gameMode", "singleplayer");
        } else if (gameMode === "multiplayer") {
            this.multiPlayerGameStrategy = new MultiPlayerGameStrategy;
            window.sessionStorage.setItem("gameMode", "multiplayer");
        }
    }

    destroy() {
        this.multiPlayerGameStrategy = null;
        this.singlePlayerGameStrategy = null;
    }
}

export {GameManager, }