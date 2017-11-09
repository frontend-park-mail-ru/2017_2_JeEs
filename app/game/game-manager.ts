import SinglePlayerGameStrategy from "./game-strategies/singleplayer-game-strategy"
import GameView from "./gameview/gameviewmanager"

class GameManager {
    private singlePlayerGameStrategy;
    private _gameView: GameView;
    private static __instance: GameManager = null;

    constructor(fieldDimension: number) {
        if (GameManager.__instance) {
            return GameManager.__instance;
        }

        this.singlePlayerGameStrategy = new SinglePlayerGameStrategy(fieldDimension);

        GameManager.__instance = this;
    }

    set gameView(value: GameView) {
        this._gameView = value;
    }
}

export {GameManager, }