//  __ ___ ___ __ __        __ ____ ____ __ __
// |__|___|___|__|__|      |__|____|____|__|__|
// |__|uL[|]__|__|__|      |__|____|____|__|__|
// |__|__[|]lR|__|__|      |__|uL__|__  |__|__|
// |__|___|___|__|__|      |__|____|__lR|__|__|
// |__|___|___|__|__|      |__|____|____|__|__|
//
// [|] - this is a         this shit in the middle
// [|]   wall, ok?         is a wall too, but a
//                         horizontal one :)

import Point from "./point";

export default class Wall {
    private upperLeft: Point;
    private lowerRight: Point;

    constructor(upperLeft: Point, lowerRight: Point) {
        this.upperLeft = upperLeft;
        this.lowerRight = lowerRight;
    }
}