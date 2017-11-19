import SinglePlayerGameStrategy from "../../app/game/game-strategies/singleplayer-game-strategy"
import EventBus from "../../app/modules/event-bus"
import {FIGURE_KEY} from "../../app/game/utils/field-state"
import EVENTS from "../../app/game/utils/events"
import Point from "../../app/game/utils/point"

const eventBus: EventBus = new EventBus;
let singlePlayerGameStrategy: SinglePlayerGameStrategy;

window.sessionStorage["fieldDimension"] = "5";

describe("Figure movements", () => {
    beforeEach(() => {
        singlePlayerGameStrategy = new SinglePlayerGameStrategy();
    });

    afterEach(() => {
        singlePlayerGameStrategy.gameStrategy.destroy();
        singlePlayerGameStrategy = null;
    });

    it("initial positions", () => {
        // for first player
        expect(singlePlayerGameStrategy.firstPlayersFieldState.getFigure(FIGURE_KEY.YOUR).position)
            .toEqual({ x: 0, y: 4 });
        expect(singlePlayerGameStrategy.firstPlayersFieldState.getFigure(FIGURE_KEY.OPPONENTS).position)
            .toEqual({ x: 8, y: 4 });

        // for second player
        expect(singlePlayerGameStrategy.secondPlayersFieldState.getFigure(FIGURE_KEY.YOUR).position)
            .toEqual({ x: 0, y: 4 });
        expect(singlePlayerGameStrategy.secondPlayersFieldState.getFigure(FIGURE_KEY.OPPONENTS).position)
            .toEqual({ x: 8, y: 4 });
    });

    it("first movements", () => {
        // first player
        expect(singlePlayerGameStrategy.gameStrategy.fieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 0, y: 6 },  // up
                { x: 2, y: 4 }, // right
                { x: 0, y: 2 } // down
            ]));
        eventBus.emit(EVENTS.YOUR_FIGURE_MOVED, { point: new Point(2, 4) });

        // second player
        expect(singlePlayerGameStrategy.gameStrategy.fieldState.getFigure(FIGURE_KEY.OPPONENTS).position)
            .toEqual({ x: 6, y: 4});
        expect(singlePlayerGameStrategy.gameStrategy.fieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 0, y: 6 },  // up
                { x: 2, y: 4 }, // right
                { x: 0, y: 2 } // down
            ]));
        eventBus.emit(EVENTS.YOUR_FIGURE_MOVED, { point: new Point(0, 6) });

        // first player
        expect(singlePlayerGameStrategy.gameStrategy.fieldState.getFigure(FIGURE_KEY.OPPONENTS).position)
            .toEqual({ x: 8, y: 2});
        expect(singlePlayerGameStrategy.gameStrategy.fieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 2, y: 6 },   // up
                { x: 4, y: 4 },  // right
                { x: 2, y: 2 }, // down
                { x: 0, y: 4 } // left
            ]));
    });

    it("collisions", () => {
        // first player
        eventBus.emit(EVENTS.YOUR_FIGURE_MOVED, {point: new Point(2, 4)});
        // second player
        eventBus.emit(EVENTS.YOUR_FIGURE_MOVED, {point: new Point(2, 4)});
        // first player
        eventBus.emit(EVENTS.YOUR_FIGURE_MOVED, {point: new Point(4, 4)});
        // second player
        expect(singlePlayerGameStrategy.gameStrategy.fieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 2, y: 6 },   // up
                { x: 6, y: 4 },  // right, jump over the opponent
                { x: 2, y: 2 }, // down
                { x: 0, y: 4 } // left
            ]));
        eventBus.emit(EVENTS.YOUR_FIGURE_MOVED, {point: new Point(6, 4)});
        // first player
        expect(singlePlayerGameStrategy.gameStrategy.fieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 4, y: 6 },   // up
                { x: 6, y: 4 },  // right
                { x: 4, y: 2 }, // down
                { x: 0, y: 4 } // left, jump over the opponent
            ]));
        eventBus.emit(EVENTS.YOUR_FIGURE_MOVED, {point: new Point(4, 2)});
        // second player
        expect(singlePlayerGameStrategy.gameStrategy.fieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 6, y: 6 },   // up
                { x: 8, y: 4 },  // right
                { x: 6, y: 2 }, // down
                { x: 4, y: 4 } // left
            ]));
        eventBus.emit(EVENTS.YOUR_FIGURE_MOVED, {point: new Point(4, 4)});
        // first player
        expect(singlePlayerGameStrategy.gameStrategy.fieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 4, y: 6 },   // up, jump over the opponent
                { x: 6, y: 2 },  // right
                { x: 4, y: 0 }, // down
                { x: 2, y: 2 } // left
            ]));
        eventBus.emit(EVENTS.YOUR_FIGURE_MOVED, {point: new Point(4, 6)});
        // second player
        expect(singlePlayerGameStrategy.gameStrategy.fieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 4, y: 6 },   // up
                { x: 6, y: 4 },  // right
                { x: 4, y: 0 }, // down, jump over the opponent
                { x: 2, y: 4 } // left
            ]));
    });

    it("map edges", () => {
        // first player
        eventBus.emit(EVENTS.YOUR_FIGURE_MOVED, {point: new Point(0, 0)});
        expect(singlePlayerGameStrategy.firstPlayersFieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 0, y: 2 }, // up
                { x: 2, y: 0 } // right
            ]));
        // second player
        eventBus.emit(EVENTS.YOUR_FIGURE_MOVED, {point: new Point(0, 8)});
        expect(singlePlayerGameStrategy.secondPlayersFieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 2, y: 8 }, // right
                { x: 0, y: 6 } // down
            ]));
        // first player
        eventBus.emit(EVENTS.YOUR_FIGURE_MOVED, {point: new Point(2, 0)});
        expect(singlePlayerGameStrategy.firstPlayersFieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 2, y: 2 },  // up
                { x: 4, y: 0 }, // right
                { x: 0, y: 0}  // left
            ]));
        // second player
        eventBus.emit(EVENTS.YOUR_FIGURE_MOVED, {point: new Point(2, 8)});
        expect(singlePlayerGameStrategy.secondPlayersFieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 4, y: 8 },  // right
                { x: 0, y: 8 }, // left
                { x: 2, y: 6 } // down
            ]));
    });

    it("collisions near map edges", () => {
        // first player
        eventBus.emit(EVENTS.YOUR_FIGURE_MOVED, {point: new Point(6, 4)});
        // second player
        expect(singlePlayerGameStrategy.secondPlayersFieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 0, y: 6 }, // up
                { x: 0, y: 2 } // down
            ]));
        eventBus.emit(EVENTS.YOUR_FIGURE_MOVED, {point: new Point(0, 0)});
        // first player
        eventBus.emit(EVENTS.YOUR_FIGURE_MOVED, {point: new Point(6, 8)});
        // second player
        expect(singlePlayerGameStrategy.secondPlayersFieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 0, y: 2 } // up
            ]));
        expect(singlePlayerGameStrategy.firstPlayersFieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 6, y: 6 }, // down
                { x: 4, y: 8 } // left
            ]));
        eventBus.emit(EVENTS.YOUR_FIGURE_MOVED, {point: new Point(4, 0)});
        // first player
        expect(singlePlayerGameStrategy.firstPlayersFieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 8, y: 8 }, // right
                { x: 6, y: 6 } // left
            ]));
    });
});