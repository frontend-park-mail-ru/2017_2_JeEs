// game field:
//   _________________
// 8|O : O : O : O : O|
// 7|: : : : : : : : :|
// 6|O : O : O : O : O|
// 5|: : : : : : : : :|
// 4|O : O : O : O : O|
// 3|: : : : : : : : :|
// 2|O : O : O : O : O|
// 1|: : : : : : : : :|
// 0|O : O : O : O : O|
//   0 1 2 3 4 5 6 7 8
// fieldDimension = 5
// O is for figures, : for walls

// vertical:    horizontal:
// : upper          ....
// : lower      left    right

import Point from "../utils/point";

export default class Wall {
    private _upperOrLeft: Point;
    private _lowerOrRight: Point;

    constructor(upperOrLeft: Point, lowerOrRight: Point) {
        let points: Point[] = [...arguments];
        let dataIsValid: boolean = true;
        points.forEach((point: Point) => {
            if ((point.x % 2 === 0) && (point.y % 2 === 0)) {
                dataIsValid = false;
                return;
            }
        });
        if (!dataIsValid) {
            return;
        }

        this._upperOrLeft = upperOrLeft;
        this._lowerOrRight = lowerOrRight;
    }

    get lowerOrRight(): Point {
        return this._lowerOrRight;
    }

    get upperOrLeft(): Point {
        return this._upperOrLeft;
    }
}