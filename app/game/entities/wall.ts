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
// : upper
// :                : : :
// : lower      left     right

import Point from "../utils/point";

export default class Wall {
    private _upperOrLeft: Point;
    private _lowerOrRight: Point;
    private _central: Point;
    private _isValid: boolean;
    private static readonly _length: number = 3;

    constructor(upperOrLeft: Point, lowerOrRight: Point) {
        let {isValid, isVertical, isHorizontal} = Wall.getValidationResult(upperOrLeft, lowerOrRight);

        if (!(this._isValid = isValid)) {
            return null;
        }

        this._upperOrLeft = upperOrLeft;
        this._lowerOrRight = lowerOrRight;

        if (isVertical) {
            this._central = new Point(this._upperOrLeft.x, (this._upperOrLeft.y + this._lowerOrRight.y) / 2);
        } else if (isHorizontal) {
            this._central = new Point((this._upperOrLeft.x + this._lowerOrRight.x) / 2, this._upperOrLeft.y);
        }
    }

    private static getValidationResult(upperOrLeft: Point, lowerOrRight: Point): any {
        const isVertical: boolean =
            (upperOrLeft.x === lowerOrRight.x) &&
            (upperOrLeft.x % 2 === 1) &&
            (upperOrLeft.y % 2 === 0) && (lowerOrRight.y % 2 === 0) &&
            (Math.abs(upperOrLeft.y - lowerOrRight.y ) === Wall._length - 1);

        const isHorizontal: boolean =
            (upperOrLeft.x % 2 === 0) && (lowerOrRight.x % 2 === 0) &&
            (Math.abs(upperOrLeft.x - lowerOrRight.x) === Wall._length - 1) &&
            (upperOrLeft.y === lowerOrRight.y) &&
            (upperOrLeft.y % 2 === 1);

        const maxCellIndex: number = 2 * (parseInt(window.sessionStorage["fieldDimension"]) - 1);
        const coordinatesAreInValidRange: boolean =
            [...(<any>Object).values(upperOrLeft), ...(<any>Object).values(lowerOrRight)]
                .every((coordinate: number): boolean => {
                    return (coordinate >= 0) && (coordinate <= maxCellIndex)
                });

        const isValid: boolean = coordinatesAreInValidRange && (isVertical || isHorizontal);

        return {isValid, isVertical, isHorizontal};
    }

    get lowerOrRight(): Point {
        return this._lowerOrRight;
    }

    get upperOrLeft(): Point {
        return this._upperOrLeft;
    }

    get central(): Point {
        return this._central;
    }

    get isValid(): boolean {
        return this._isValid;
    }
}