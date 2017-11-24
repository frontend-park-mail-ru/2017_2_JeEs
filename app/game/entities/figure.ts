// game field:
//   _________________
// 8|O : O : O : O : O|
// 7|: : : : : : : : :|
// 6|O : O : O : O : O|
// 5|: : : : : : : : :|
// 4|% : O : O : O : $|
// 3|: : : : : : : : :|
// 2|O : O : O : O : O|
// 1|: : : : : : : : :|
// 0|O : O : O : O : O|
//   0 1 2 3 4 5 6 7 8
// fieldDimension = 5
// O is for figures, : for walls
// % is you, $ is your opponent


import Point from "../utils/point"

enum ACTOR {
    YOU,
    OPPONENT
}

function * ownerGeneratorFunction() {
    while (true) {
        yield ACTOR.YOU;
        yield ACTOR.OPPONENT;
    }
}

export default class Figure {
    private _position: Point;
    private static owners: IterableIterator<ACTOR> = ownerGeneratorFunction();

    constructor(private fieldDimension: number) {
        const figureTypeIterator: IteratorResult<ACTOR> = Figure.owners.next();
        if (figureTypeIterator.done) {
            return;
        }

        let owner: ACTOR = figureTypeIterator.value;
        // actualFieldSize = 2 * fieldDimension - 1;
        // lastY = actualFieldSize - 1 = 2 * (fieldDimension - 1);
        // initialY = lastY / 2 = fieldDimension - 1;
        if (owner === ACTOR.YOU) {
            this._position = new Point(0, /* initialY */ fieldDimension - 1);
        } else if (owner === ACTOR.OPPONENT) {
            this._position = new Point(/* lastY */ 2 * (fieldDimension - 1), /* initialY */ fieldDimension - 1);
        }

        this.fieldDimension = fieldDimension;
    }

    public moveTo(point: Point): void {
        if ((point.x % 2 === 0) && (point.y % 2 === 0)) {
            this._position = point;
        }
    }

    get position(): Point {
        return this._position;
    }

    hasReachedFinish(): boolean {
        return (this._position.x === /* lastY */ 2 * (this.fieldDimension - 1));
    }
}