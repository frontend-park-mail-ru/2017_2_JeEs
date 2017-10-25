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

import Point from "../utils/point";

enum WALL_ORIENTATION {
    VERTICAL,
    HORIZONTAL
}

class Wall {
    private upperLeft: Point;
    private lowerRight: Point;
    private orientation: WALL_ORIENTATION;

    constructor(upperLeft: Point, lowerRight: Point, orientation: WALL_ORIENTATION) {
        this.upperLeft = upperLeft;
        this.lowerRight = lowerRight;
        this.orientation = orientation;
    }
}

export {Wall, WALL_ORIENTATION}