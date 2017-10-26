import Figure from "../entities/figure"
import Wall from "../entities/wall"
import Point from "./point"

enum FIGURE_KEY {
    YOUR,
    OPPONENTS
}

enum DIRECTION {
    UP,
    DOWN,
    RIGHT,
    LEFT
}

function * surroundingPointsGeneratorFunction() {
    yield {
        direction: DIRECTION.UP,
        point: new Point(this.getYourFigureCoordinates().x, this.getYourFigureCoordinates().y + 1)
    };
    yield {
        direction: DIRECTION.RIGHT,
        point: new Point(this.getYourFigureCoordinates().x + 1, this.getYourFigureCoordinates().y)
    };
    yield {
        direction: DIRECTION.DOWN,
        point: new Point(this.getYourFigureCoordinates().x, this.getYourFigureCoordinates().y - 1)
    };
    yield {
        direction: DIRECTION.LEFT,
        point: new Point(this.getYourFigureCoordinates().x - 1, this.getYourFigureCoordinates().y)
    };
    return;
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

    public getYourFigureCoordinates(): Point {
        return this.figureMap.get(FIGURE_KEY.YOUR).position;
    }

    public getWallPoints(): Set<Point> {
        let result = new Set<Point>();
        this.walls.forEach((wall) => {
            result.add(wall.upperOrLeft);
            result.add(wall.lowerOrRight);
        });
        return result;
    }


    // sry for this function
    public getAvailableForMovementPoints(): Point[] {
        // idk wtf is goin' on below, but hope it works
        let engagedPoints: Set<string> = new Set(this.walls.map((wall) => {
            return JSON.stringify([wall.upperOrLeft, wall.lowerOrRight].filter((point) => {
                let xIsEven = point.x % 2 === 0;
                let yIsEven = point.y % 2 === 0;
                return (xIsEven && !yIsEven) || (!xIsEven && yIsEven); // xIsEven XOR yIsEven
            })[0]);
        }));

        let result: Point[] = [];
        let surroundingPointsIterator: IterableIterator<{direction, point}> =
            surroundingPointsGeneratorFunction.bind(this)();

        let yourFigureCoordinates = this.getYourFigureCoordinates();
        for(let directionAndPoint of surroundingPointsIterator) {
            if (engagedPoints.has(JSON.stringify(directionAndPoint.point))) {
                continue;
            }

            switch (directionAndPoint.direction) {
                case DIRECTION.UP: {
                    result.push(new Point(yourFigureCoordinates.x, yourFigureCoordinates.y + 2));
                    break;
                }
                case DIRECTION.RIGHT: {
                    result.push(new Point(yourFigureCoordinates.x + 2, yourFigureCoordinates.y));
                    break;
                }
                case DIRECTION.DOWN: {
                    if (yourFigureCoordinates.y - 2 >= 0) {
                        result.push(new Point(yourFigureCoordinates.x, yourFigureCoordinates.y - 2));
                    }
                    break;
                }
                case DIRECTION.LEFT: {
                    if (yourFigureCoordinates.x - 2 >= 0) {
                        result.push(new Point(yourFigureCoordinates.x - 2, yourFigureCoordinates.y));
                    }
                    break;
                }
            }
        }

        return result;
    }
}

export {FieldState, FIGURE_KEY};