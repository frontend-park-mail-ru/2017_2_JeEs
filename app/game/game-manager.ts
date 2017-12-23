import SinglePlayerGameStrategy from "./game-strategies/singleplayer-game-strategy"
import MultiPlayerGameStrategy from "./game-strategies/multiplayer-game-strategy"

class GameManager {
    private gameStrategy: SinglePlayerGameStrategy | MultiPlayerGameStrategy;

    constructor(gameMode: string) {
        switch (gameMode) {
            case "singleplayer": {
                this.gameStrategy = new SinglePlayerGameStrategy;
                break;
            }
            case "multiplayer": {
                this.gameStrategy = new MultiPlayerGameStrategy;
                break;
            }
        }
        window.sessionStorage.setItem("gameMode", gameMode);
    }

    public destroy() {
        this.gameStrategy = null;
    }
}

export {GameManager, }