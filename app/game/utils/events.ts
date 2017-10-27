export default abstract class EVENTS {

    // emitted in view, handled in GameStrategy
    public static readonly YOUR_FIGURE_MOVED: string = "game:figure_moved";
    public static readonly YOUR_WALL_PLACED: string = "game:wall_placed";
    public static readonly GAME_CLOSED: string = "game:game_closed";

    // emitted in GameStrategy, handled in Single- and MultiPlayerGameStrategy
    public static readonly TURN_ENDED: string = "game:turn_ended";

    // emitted in Single- and MultiPlayerGameStrategy, handled in GameStrategy
    public static readonly OPPONENTS_FIGURE_MOVED: string = "game:opponents_figure_moved";
    public static readonly OPPONENTS_WALL_PLACED: string = "game:opponents_wall_placed";

    // emitted and handled in view
    public static readonly GAMEVIEW_HERO_MOVEMENT_START: string = "gameview:hero_movement_start"
    public static readonly GAMEVIEW_WALL_PLACED: string = "gameview:wall_placed"  //костыль для синглплеера

    // emitted in GameStrategy, handled in view
    public static readonly TURN_BEGAN: string = "game:turn_began";
}