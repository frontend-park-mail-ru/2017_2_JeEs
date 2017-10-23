// initial positions of figures:
//         _ _ _ _ _
//        |_|_|_|_|_|
//        |_|_|_|_|_|
// host-> |h|_|_|_|g| <-guest
//        |_|_|_|_|_|
//        |_|_|_|_|_|
//
// fieldDimension = 5

import Point from "./point";

enum FigureType { HOST, GUEST }

function * figureTypeGenerator() {
    yield FigureType.HOST;
    yield FigureType.GUEST;
    return;
}

enum Movement { FORWARD, BACKWARD, LEFT, RIGHT }

class Figure {
    private position: Point;
    private type: FigureType;
    private static figureTypes: IterableIterator<FigureType> = figureTypeGenerator();

    constructor(fieldDimension: number) {
        const figureTypeIterator: IteratorResult<FigureType> = Figure.figureTypes.next();
        if (figureTypeIterator.done) {
            return;
        }

        this.type = figureTypeIterator.value;
        if (this.type === FigureType.HOST) {
            this.position = new Point(0, Math.floor(fieldDimension / 2));
        } else if (this.type === FigureType.GUEST) {
            this.position = new Point(fieldDimension, fieldDimension / 2);
        }
    }

    move(movement: Movement): void {
        if (this.type === FigureType.HOST) {
            switch (movement) {
                case Movement.FORWARD: {
                    this.position.x += 1;
                    break;
                }
                case Movement.BACKWARD: {
                    this.position.x -= 1;
                    break;
                }
                case Movement.LEFT: {
                    this.position.y += 1;
                    break;
                }
                case Movement.RIGHT: {
                    this.position.y -= 1;
                    break;
                }
            }
        } else {
            switch (movement) {
                case Movement.FORWARD: {
                    this.position.x -= 1;
                    break;
                }
                case Movement.BACKWARD: {
                    this.position.x += 1;
                    break;
                }
                case Movement.LEFT: {
                    this.position.y -= 1;
                    break;
                }
                case Movement.RIGHT: {
                    this.position.y += 1;
                    break;
                }
            }
        }
    }
}

export default Figure;