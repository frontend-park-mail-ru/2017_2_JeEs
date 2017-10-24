// initial positions of figures:
//         _ _ _ _ _
//        |_|_|_|_|_|
//        |_|_|_|_|_|
// host-> |h|_|_|_|g| <-guest
//        |_|_|_|_|_|
//        |_|_|_|_|_|
//
// fieldDimension = 5

import Point from "../utils/point"
import ACTOR from "../utils/actor"


function * ownerGenerator() {
    yield ACTOR.HOST;
    yield ACTOR.GUEST;
    return;
}

enum MOVEMENT {
    FORWARD,
    BACKWARD,
    LEFT,
    RIGHT
}

class Figure {
    private position: Point;
    private owner: ACTOR;
    private static owners: IterableIterator<ACTOR> = ownerGenerator();

    constructor(fieldDimension: number) {
        const figureTypeIterator: IteratorResult<ACTOR> = Figure.owners.next();
        if (figureTypeIterator.done) {
            return;
        }

        this.owner = figureTypeIterator.value;
        if (this.owner === ACTOR.HOST) {
            this.position = new Point(0, Math.floor(fieldDimension / 2));
        } else if (this.owner === ACTOR.GUEST) {
            this.position = new Point(fieldDimension, Math.floor(fieldDimension / 2));
        }
    }

    move(movement: MOVEMENT): void {
        if (this.owner === ACTOR.HOST) {
            switch (movement) {
                case MOVEMENT.FORWARD: {
                    this.position.x += 1;
                    break;
                }
                case MOVEMENT.BACKWARD: {
                    this.position.x -= 1;
                    break;
                }
                case MOVEMENT.LEFT: {
                    this.position.y += 1;
                    break;
                }
                case MOVEMENT.RIGHT: {
                    this.position.y -= 1;
                    break;
                }
            }
        } else {
            switch (movement) {
                case MOVEMENT.FORWARD: {
                    this.position.x -= 1;
                    break;
                }
                case MOVEMENT.BACKWARD: {
                    this.position.x += 1;
                    break;
                }
                case MOVEMENT.LEFT: {
                    this.position.y -= 1;
                    break;
                }
                case MOVEMENT.RIGHT: {
                    this.position.y += 1;
                    break;
                }
            }
        }
    }
}

export {Figure, MOVEMENT};