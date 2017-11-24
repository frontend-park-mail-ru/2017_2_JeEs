import SinglePlayerGameStrategy from "./game-strategies/singleplayer-game-strategy"
import MultiPlayerGameStrategy from "./game-strategies/multiplayer-game-strategy"

class GameManager {
    private singlePlayerGameStrategy: SinglePlayerGameStrategy;
    private multiPlayerGameStrategy: MultiPlayerGameStrategy;

    constructor(gameMode: string) {
        switch (gameMode) {
            case "singleplayer": {
                this.singlePlayerGameStrategy = new SinglePlayerGameStrategy;
                break;
            }
            case "multiplayer": {
                this.multiPlayerGameStrategy = new MultiPlayerGameStrategy;
                break;
            }
        }
        window.sessionStorage.setItem("gameMode", gameMode);
    }

    destroy() {
        this.multiPlayerGameStrategy = null;
        this.singlePlayerGameStrategy = null;
    }
}

export {GameManager, }