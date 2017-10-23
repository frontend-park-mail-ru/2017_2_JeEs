import EventBus from "../../modules/event-bus.js"
import Figure from "../utils/figure"
import Wall from "../utils/wall"

export default class GameStrategy {
    private eventBus: EventBus;
    private hostFigure: Figure;
    private guestFigure: Figure;
    private walls: Wall[];

    constructor(fieldDimension: number) {
        this.eventBus = new EventBus;
        this.hostFigure = new Figure(fieldDimension);
        this.guestFigure = new Figure(fieldDimension);
    }
}