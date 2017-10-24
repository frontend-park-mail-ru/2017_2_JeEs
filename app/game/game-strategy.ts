import EventBus from "../modules/event-bus.js"
import {Figure, } from "./entities/figure"
import {Wall, } from "./entities/wall"
import EVENTS from "./utils/events"
import ACTOR from "./utils/actor"

function * currentActorGenerator() {
    while (true) {
        yield ACTOR.HOST;
        yield ACTOR.GUEST;
    }
}

export default class GameStrategy {
    private eventBus: EventBus;
    private hostFigure: Figure;
    private guestFigure: Figure;
    private walls: Wall[] = [];
    private eventMap: Map<String, Function> = new Map<String, Function>();
    private currentActorIterator: IterableIterator<ACTOR> = currentActorGenerator();
    private currentActor: ACTOR;

    constructor(fieldDimension: number) {
        this.eventBus = new EventBus;
        this.hostFigure = new Figure(fieldDimension);
        this.guestFigure = new Figure(fieldDimension);

        this.currentActor = this.currentActorIterator.next().value;

        this.eventMap.set(EVENTS.FIGURE_MOVED, this.onFigureMoved.bind(this));
        this.eventMap.set(EVENTS.WALL_PLACED, this.onWallPlaced.bind(this));
        this.eventMap.set(EVENTS.GAME_CLOSED, this.onDestroy.bind(this));

        this.eventMap.forEach((eventHandler: Function, event: String) => {
            this.eventBus.on(event, eventHandler);
        });
    }

    public onFigureMoved(data): void {
        let figure: Figure = (this.currentActor === ACTOR.HOST) ? this.hostFigure : this.guestFigure;
        figure.move(data.movement);
        this.endTurn();
    }

    public onWallPlaced(data): void {
        this.walls.push(new Wall(data.upperLeft, data.lowerRight, data.orientation));
        this.endTurn();
    }

    public endTurn():void {
        this.currentActor = this.currentActorIterator.next().value;
        this.eventBus.emit(EVENTS.TURN_ENDED);
    }

    public onDestroy(): void {
        this.eventMap.forEach((eventHandler: Function, event: String) => {
            this.eventBus.off(event, eventHandler);
        });
    }
}