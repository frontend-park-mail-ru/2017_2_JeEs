import Point from "./point";

interface Message {
    class: string;
}

interface InitGameMessage extends Message {
    self: number;
    enemy: string;
    isFirst: boolean;
}

interface CoordinatesMessage extends Message {
    coordinates: Array<number>;
}

interface FinishGameMessage extends Message {
    won: boolean;
}

interface InfoMessage extends Message {
    message: string;
}

export {Message, InitGameMessage, CoordinatesMessage, FinishGameMessage, InfoMessage}