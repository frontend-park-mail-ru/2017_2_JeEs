import SinglePlayerGameStrategy from "./game-strategies/singleplayer-game-strategy"
import MultiPlayerGameStrategy from "./game-strategies/multiplayer-game-strategy"
import GameView from "./gameview/gameviewmanager"

class GameManager {
    private singlePlayerGameStrategy: SinglePlayerGameStrategy;
    private multiPlayerGameStrategy: MultiPlayerGameStrategy;
    private _gameView: GameView;
    private static __instance: GameManager = null;

    constructor() {
        if (GameManager.__instance) {
            return GameManager.__instance;
        }

        // this.singlePlayerGameStrategy = new SinglePlayerGameStrategy();
        this.multiPlayerGameStrategy = new MultiPlayerGameStrategy;

        GameManager.__instance = this;
    }

    set gameView(value: GameView) {
        this._gameView = value;
    }
}

export {GameManager, }