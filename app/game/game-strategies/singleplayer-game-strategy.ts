import {GameStrategy, TURN_ENDING_EVENTS} from "./game-strategy";
import {FieldState, } from "../utils/field-state";
import EventBus from "../../modules/event-bus.js"
import EVENTS from "../utils/events";
import Point from "../utils/point";

function * fieldStatesGeneratorFunction() {
    while (true) {
        yield this.firstPlayersFieldState;
        yield this.secondPlayersFieldState;
    }
}

export default class SingleplayerGameStrategy {
    private _gameStrategy: GameStrategy;
    private firstPlayersFieldState: FieldState;
    private secondPlayersFieldState: FieldState;
    private fieldStateIterator: IterableIterator<FieldState>;
    private eventBus: EventBus;
    private fieldDimension: number;

    constructor(fieldDimension: number) {
        this._gameStrategy = new GameStrategy;
        this.firstPlayersFieldState = new FieldState(fieldDimension);
        this.secondPlayersFieldState = new FieldState(fieldDimension);
        this.fieldStateIterator = fieldStatesGeneratorFunction.bind(this)();
        this.eventBus = new EventBus();
        this.fieldDimension = fieldDimension;

        this._gameStrategy.fieldState = this.fieldStateIterator.next().value;
        this.eventBus.on(EVENTS.TURN_ENDED, this.onTurnEnded.bind(this));
    }

    private changeFieldState(): void {
        this._gameStrategy.fieldState = this.fieldStateIterator.next().value;
    }

    private onTurnEnded(data): void {
        if (data.event === TURN_ENDING_EVENTS.FIGURE_MOVED) {
            let [recountedPoint]: Point[] =
                SingleplayerGameStrategy.recountCoordinates(this.fieldDimension, data.point);
            this.changeFieldState();
            this.eventBus.emit(EVENTS.OPPONENTS_FIGURE_MOVED, {point: recountedPoint});
        } else if (data.event === TURN_ENDING_EVENTS.WALL_PLACED) {
            let [recountedUpperOrLeft, recountedLowerOrRight]: Point[] = SingleplayerGameStrategy.recountCoordinates(
                    this.fieldDimension,
                    data.upperOrLeft,
                    data.lowerOrRight
            );
            this.changeFieldState();
            this.eventBus.emit(EVENTS.OPPONENTS_WALL_PLACED, {
                upperOrLeft: recountedUpperOrLeft,
                lowerOrRight: recountedLowerOrRight
            });
        }
    }

    private static recountCoordinates(fieldDimension: number, ...points: Point[]): Point[] {
        return points.map((point) => {
            return new Point(2 * (fieldDimension - 1) - point.x, point.y);
        });
    }

    get gameStrategy(): GameStrategy {
        return this._gameStrategy;
    }
}