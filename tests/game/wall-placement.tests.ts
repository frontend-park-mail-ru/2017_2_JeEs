import SinglePlayerGameStrategy from "../../app/game/game-strategies/singleplayer-game-strategy"
import EventBus from "../../app/modules/event-bus"
import EVENTS from "../../app/game/utils/events"
import Point from "../../app/game/utils/point"

const eventBus: EventBus = new EventBus;
let singlePlayerGameStrategy: SinglePlayerGameStrategy;

describe("Wall placements", () => {
    beforeEach(() => {
        singlePlayerGameStrategy = new SinglePlayerGameStrategy(5);
    });

    afterEach(() => {
        singlePlayerGameStrategy.gameStrategy.destroy();
        singlePlayerGameStrategy = null;
    });

    it("simple and correct", () => {
        // first player
        eventBus.emit(EVENTS.YOUR_WALL_PLACED, {
            upperOrLeft: new Point(7, 6),
            lowerOrRight: new Point(7, 4)
        });
        // second player
        expect(singlePlayerGameStrategy.gameStrategy.fieldState.getEngagedPoints())
            .toEqual(
                expect.arrayContaining([{ x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }])
            );
        expect(singlePlayerGameStrategy.gameStrategy.fieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 0, y: 6 }, // up
                { x: 0, y: 2 } // down
            ]));
        eventBus.emit(EVENTS.YOUR_WALL_PLACED, {
            upperOrLeft: new Point(8, 5),
            lowerOrRight: new Point(6, 5)
        });
        // first player
        expect(singlePlayerGameStrategy.gameStrategy.fieldState.getEngagedPoints())
            .toEqual(
                expect.arrayContaining([{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }])
            );

        let lol: any = singlePlayerGameStrategy.gameStrategy.fieldState.getAvailableForMovementPoints();

        expect(lol)
            .toEqual(expect.arrayContaining([
                { x: 0, y: 6 }, // up
                { x: 2, y: 4 } // right
            ]));
    });
});