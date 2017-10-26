import EventBus from "../../modules/event-bus.js"
import EVENTS from "../utils/events"
import {FieldState, FIGURE_KEY} from "../utils/field-state"

abstract class TURN_ENDING_EVENTS {
    public static readonly FIGURE_MOVED: string = "figure_moved";
    public static readonly WALL_PLACED: string = "wall_placed";
}

class GameStrategy {
    private _fieldState: FieldState;
    private eventBus: EventBus;
    private eventMap: Map<string, (data?: Object) => void>;

    constructor() {
        this.eventBus = new EventBus;

        this._fieldState = null;

        this.eventMap = new Map<string, (data?: Object) => void>();
        this.eventMap.set(EVENTS.YOUR_FIGURE_MOVED, this.onYourFigureMoved.bind(this));
        this.eventMap.set(EVENTS.OPPONENTS_FIGURE_MOVED, this.onOpponentsFigureMoved.bind(this));
        this.eventMap.set(EVENTS.GAME_CLOSED, this.onDestroy.bind(this));

        this.eventMap.forEach((eventHandler: Function, event: string) => {
            this.eventBus.on(event, eventHandler);
        });
    }

    set fieldState(value: FieldState) {
        this._fieldState = value;
    }

    public onYourFigureMoved(data): void {
        this._fieldState.moveFigureTo(FIGURE_KEY.YOUR, data.point);
        this.eventBus.emit(EVENTS.TURN_ENDED, {
            event: TURN_ENDING_EVENTS.FIGURE_MOVED,
            point: data.point
        });
    }

    public onOpponentsFigureMoved(data): void {
        this._fieldState.moveFigureTo(FIGURE_KEY.OPPONENTS, data.point);
    }

    public onDestroy(): void {
        this.eventMap.forEach((eventHandler: Function, event: string) => {
            this.eventBus.off(event, eventHandler);
        });
    }

    // TODO: onYourWallPlaced()
    // TODO: onOpponentsWallPlaced()
}

export {GameStrategy, TURN_ENDING_EVENTS};