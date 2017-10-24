import GameStrategy from "./game/game-strategy"
import EventBus from "./modules/event-bus.js"
import EVENTS from "./game/utils/events"
import * as Figure from "./game/entities/figure"
import * as Wall from "./game/entities/wall"
import Point from "./game/utils/point"

export default function test() {
    let gameStrategy: GameStrategy = new GameStrategy(9);
    let eventBus: EventBus = new EventBus();

    debugger;
    eventBus.emit(EVENTS.FIGURE_MOVED, {movement: Figure.MOVEMENT.FORWARD});
    eventBus.emit(EVENTS.FIGURE_MOVED, {movement: Figure.MOVEMENT.LEFT});
    eventBus.emit(EVENTS.WALL_PLACED, {
        upperLeft: new Point(2, 2),
        lowerRight: new Point(3, 1),
        orientation: Wall.WALL_ORIENTATION.VERTICAL
    });
    eventBus.emit(EVENTS.WALL_PLACED, {
        upperLeft: new Point(4, 6),
        lowerRight: new Point(5, 5),
        orientation: Wall.WALL_ORIENTATION.HORIZONTAL
    });
    debugger;
}