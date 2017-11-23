import SinglePlayerGameStrategy from "../../app/game/game-strategies/singleplayer-game-strategy"
import EventBus from "../../app/modules/event-bus"
import EVENTS from "../../app/game/utils/events"
import Point from "../../app/game/utils/point"
import Wall from "../../app/game/entities/wall";

const eventBus: EventBus = new EventBus;
let singlePlayerGameStrategy: SinglePlayerGameStrategy;
let upperOrLeft: Point;
let lowerOrRight: Point;

window.sessionStorage["fieldDimension"] = "5";

describe("Wall placements", () => {
    beforeEach(() => {
        singlePlayerGameStrategy = new SinglePlayerGameStrategy;
    });

    afterEach(() => {
        singlePlayerGameStrategy.gameStrategy.destroy();
        singlePlayerGameStrategy = null;
        upperOrLeft = null;
        lowerOrRight = null;
    });

    it("simple and correct", () => {
        // first player
        upperOrLeft = new Point(7, 6);
        lowerOrRight = new Point(7, 4);
        expect(Wall.getValidationResult(upperOrLeft, lowerOrRight)).toEqual({
            isValid: true,
            isVertical: true,
            isHorizontal: false
        });
        eventBus.emit(EVENTS.YOUR_WALL_PLACED, { upperOrLeft, lowerOrRight });

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
        upperOrLeft = new Point(8, 5);
        lowerOrRight = new Point(6, 5);
        expect(Wall.getValidationResult(upperOrLeft, lowerOrRight)).toEqual({
            isValid: true,
            isVertical: false,
            isHorizontal: true
        });
        eventBus.emit(EVENTS.YOUR_WALL_PLACED, { upperOrLeft, lowerOrRight });

        // first player
        expect(singlePlayerGameStrategy.gameStrategy.fieldState.getEngagedPoints())
            .toEqual(
                expect.arrayContaining([{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }])
            );

        expect(singlePlayerGameStrategy.gameStrategy.fieldState.getAvailableForMovementPoints())
            .toEqual(expect.arrayContaining([
                { x: 0, y: 6 }, // up
                { x: 2, y: 4 } // right
            ]));
    });

    // {
    //     upperOrLeft: new Point(),
    //         lowerOrRight: new Point()
    // }

    it("incorrect", () => {
        let incorrectPoints: Array<{}> = [
            // horizontal
            {
                upperOrLeft: new Point(0, 0),
                lowerOrRight: new Point(2, 0)
            },
            {
                upperOrLeft: new Point(1, 3),
                lowerOrRight: new Point(3, 3)
            },
            {
                upperOrLeft: new Point(1, 2),
                lowerOrRight: new Point(3, 2)
            },
            {
                upperOrLeft: new Point(-1, 1),
                lowerOrRight: new Point(1, 1)
            },
            {
                upperOrLeft: new Point(6, 3),
                lowerOrRight: new Point(9, 3)
            },
            // vertical
            {
                upperOrLeft: new Point(0, 0),
                lowerOrRight: new Point(0, 2)
            },
            {
                upperOrLeft: new Point(3, 1),
                lowerOrRight: new Point(3, 3)
            },
            {
                upperOrLeft: new Point(2, 1),
                lowerOrRight: new Point(2, 3)
            },
            {
                upperOrLeft: new Point(1, -1),
                lowerOrRight: new Point(1, 1)
            },
            {
                upperOrLeft: new Point(6, 9),
                lowerOrRight: new Point(6, 7)
            }
        ];

        // no matter who places the wall
        incorrectPoints.forEach((pointsObject: {}) => {
            eventBus.emit(EVENTS.YOUR_WALL_PLACED, pointsObject);
        });

        expect(singlePlayerGameStrategy.gameStrategy.fieldState.getEngagedPoints(false))
            .toHaveLength(0);
    });
});