import SingleplayerGameStrategy from "./game-strategies/singleplayer-game-strategy"
import GameView from "./gameview/gameviewmanager"

class GameManager {
    private singleplayerGameStrategy;
    private _gameView: GameView;
    private static __instance: GameManager = null;

    constructor(fieldDimension: number) {
        if (GameManager.__instance) {
            return GameManager.__instance;
        }

        this.singleplayerGameStrategy = new SingleplayerGameStrategy(fieldDimension);

        GameManager.__instance = this;
    }

    set gameView(value: GameView) {
        this._gameView = value;
    }
}

export {GameManager, }