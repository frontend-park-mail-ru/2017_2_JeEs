import Figure from "../entities/figure"
import Wall from "../entities/wall"
import Point from "./point"

enum FIGURE_KEY {
    YOUR,
    OPPONENTS
}

function * surroundingPointsGeneratorFunction(yourFigurePosition: Point) {
    // UP
    yield { // thx, Serge Peshkofff
        pointPossiblyContainingWall: {...yourFigurePosition, y: yourFigurePosition.y + 1},
        pointToMove: {...yourFigurePosition, y: yourFigurePosition.y + 2}
    };
    // RIGHT
    yield {
        pointPossiblyContainingWall: {...yourFigurePosition, x: yourFigurePosition.x + 1},
        pointToMove: {...yourFigurePosition, x: yourFigurePosition.x + 2}
    };
    // DOWN
    yield {
        pointPossiblyContainingWall: {...yourFigurePosition, y: yourFigurePosition.y - 1},
        pointToMove: {...yourFigurePosition, y: yourFigurePosition.y - 2}
    };
    // LEFT
    yield {
        pointPossiblyContainingWall: {...yourFigurePosition, x: yourFigurePosition.x - 1},
        pointToMove: {...yourFigurePosition, x: yourFigurePosition.x - 2}
    };
    return;
}

class FieldState {
    private figureMap: Map<FIGURE_KEY, Figure>;
    private walls: Wall[];
    private lastIndex: number;

    constructor(fieldDimension: number) {
        this.figureMap = new Map<FIGURE_KEY, Figure>();
        this.figureMap.set(FIGURE_KEY.YOUR, new Figure(fieldDimension));
        this.figureMap.set(FIGURE_KEY.OPPONENTS, new Figure(fieldDimension));
        this.walls = [];
        this.lastIndex = 2 * (fieldDimension - 1);
    }

    public moveFigureTo(figureKey: FIGURE_KEY, point: Point): void {
        this.figureMap.get(figureKey).moveTo(point);
    }

    public insertWall(upperOrLeft: Point, lowerOrRight: Point) {
        this.walls.push(new Wall(upperOrLeft, lowerOrRight));
    }

    public getEngagedPoints(): Array<Point> {
        return []
            .concat(...this.walls.map((wall) => {
                return [wall.upperOrLeft, wall.central, wall.lowerOrRight]
            }))
            .concat([...this.figureMap.values()].map((figure) => {
                return figure.position
            }));
    }


    public getAvailableForMovementPoints(): Point[] {
        let wallPoints: Point[] = this.walls.map((wall) => {return wall.central});

        let result: Point[] = [];
        let surroundingPointsIterator: IterableIterator<{pointPossiblyContainingWall, pointToMove}> =
            surroundingPointsGeneratorFunction(this.figureMap.get(FIGURE_KEY.YOUR).position);

        for (let pointsObject of surroundingPointsIterator) {
            // if wallPoints not contains pointsObject.pointPossiblyContainingWall
            if (wallPoints.filter(point => point.equals(pointsObject.pointPossiblyContainingWall)).length === 0) {
                result.push(pointsObject.pointToMove);
            }
        }

        return result.filter((point) => {
            return (point.x >= 0) && (point.y >= 0) && (point.x <= this.lastIndex) && (point.y <= this.lastIndex)
        });
    }
}

export {FieldState, FIGURE_KEY};