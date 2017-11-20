interface Message {
    class: string;
}

interface InitGameMessage extends Message {
    self: number;
    enemy: number;
    isFirst: boolean;
}

interface CoordinatesMessage extends Message {
    coordinates: string;
}

export {Message, InitGameMessage, CoordinatesMessage}