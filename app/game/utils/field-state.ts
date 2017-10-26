import Figure from "../entities/figure"
import Wall from "../entities/wall"
import Point from "./point"

enum FIGURE_KEY {
    YOUR,
    OPPONENTS
}

class FieldState {
    private figureMap: Map<FIGURE_KEY, Figure>;
    private walls: Wall[];

    constructor(fieldDimension: number) {
        this.figureMap = new Map<FIGURE_KEY, Figure>();
        this.figureMap.set(FIGURE_KEY.YOUR, new Figure(fieldDimension));
        this.figureMap.set(FIGURE_KEY.OPPONENTS, new Figure(fieldDimension));
        this.walls = [];
    }

    public moveFigureTo(figureKey: FIGURE_KEY, point: Point): void {
        this.figureMap.get(figureKey).moveTo(point);
    }

    public insertWall(upperOrLeft: Point, lowerOrRight: Point) {
        this.walls.push(new Wall(upperOrLeft, lowerOrRight));
    }
}

export {FieldState, FIGURE_KEY};