import SingleplayerGameStrategy from "./game-strategies/singleplayer-game-strategy"
import GameStrategyInterface from "./game-strategies/game-strategy-interface"
import GameView from "./gameview/gameviewmanager"

enum GAME_TYPE {
    SINGLEPLAYER,
    MULTIPLAYER
}

class GameManager {
    private gameStrategy: GameStrategyInterface;
    private _gameView: GameView;
    private static __instance: GameManager = null;

    constructor(gameType: GAME_TYPE, fieldDimension: number) {
        if (GameManager.__instance) {
            return GameManager.__instance;
        }

        if (gameType === GAME_TYPE.SINGLEPLAYER) {
            this.gameStrategy = new SingleplayerGameStrategy(fieldDimension);
        }

        GameManager.__instance = this;
    }

    set gameView(value: GameView) {
        this._gameView = value;
    }
}

export {GameManager, GAME_TYPE}