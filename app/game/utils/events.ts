export default abstract class EVENTS {

    public static readonly SIGNLEPLAYER: string = "game:singleplayer";
    public static readonly MULTIPLAYER: string = "game:multiplayer";

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
    public static readonly GAMEVIEW_HERO_MOVEMENT_START: string = "gameview:hero_movement_start";
    public static readonly GAMEVIEW_WALL_PLACED: string = "gameview:wall_placed";
    public static readonly GAMEVIEW_VALIDATE_WALL: string = "gameview:validate_wall";
    public static readonly GAMEVIEW_SEND_MESSAGE: string = "gameview:send_message";
    public static readonly GAMEVIEW_START_TIMER: string = "gameview:start_timer";




    // emitted in GameStrategy, handled in view
    public static readonly TURN_BEGAN: string = "game:turn_began";
    public static readonly GAME_OVER: string = "game:game_over";

    // emitted in transport, handled in MultiPlayerGameStrategy
    public static readonly GAME_STARTED: string = "game:game_started";
    public static readonly YOUR_TURN: string = "game:your_turn";

    // emitted in gameviewview (!), handled in transport
    public static readonly WEBSOCKET_OPEN: string = "network:websocket_open";
    public static readonly WEBSOCKET_CLOSE: string = "network:websocket_close";

    // emitted and handled in view, needed for interface
    public static readonly OPPONENTHERO_WALL_NUMBER: string = "gameview:opponenthero_wall_number";
    public static readonly MAINHERO_WALL_NUMBER: string = "gameview:mainhero_wall_number";
    public static readonly OPPONENTHERO_NAME: string = "gameview:opponenthero_name";

    public static readonly VALIDATE_WALL: string = "game:validate_wall";
    public static readonly INFO_MESSAGE_RECEIVED: string = "network:info_message_received";

    public static readonly WALL_IS_VALID: string = "game:wall_is_valid";
    public static readonly WALL_IS_INVALID: string = "game:wall_is_invalid";
}