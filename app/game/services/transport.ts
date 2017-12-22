import Point from "../utils/point";
import EventBus from "../../modules/event-bus"
import EVENTS from "../utils/events"
import * as messages from "../utils/messages"

export default class Transport {
    private static __instance: Transport;
    private webSocket: WebSocket;
    private messagesQueue: Array<string>;
    private eventBus: EventBus;
    private updateInterval: number;
    private handlersMap: Map<string, (data: messages.Message) => void>;

    constructor() {
        if (Transport.__instance) {
            return Transport.__instance;
        }

        Transport.__instance = this;

        this.initialize();

        this.eventBus = new EventBus;
        this.eventBus.on(EVENTS.WEBSOCKET_OPEN, () => { // sry for this
            if (this.webSocket.readyState === WebSocket.CLOSED) {
                this.webSocket.onerror = null;
                this.webSocket.onmessage = null;
                this.webSocket.onopen = null;
                this.webSocket.onclose = null;
                this.webSocket = null;
                this.initialize();
            }
        });
        this.eventBus.on(EVENTS.WEBSOCKET_CLOSE, () => {
            this.webSocket.close();
        });

        this.handlersMap = new Map();
        this.handlersMap.set("InitGame", this.handleInitGameMessage);
        this.handlersMap.set("Coordinates", this.parseCoordinates);
        this.handlersMap.set("FinishGame", this.handleFinishGameMessage);
        this.handlersMap.set("InfoMessage", this.handleInfoMessage);
    }

    private initialize() {
        let [protocol, host]: Array<string> = window.localStorage["backendUrl"].split("://");
        let address: string = (protocol === "https") ? `wss://${host}/game` : `ws://${host}/game`;

        this.messagesQueue = [];
        this.webSocket = new WebSocket(address);

        this.webSocket.onerror = (event: ErrorEvent) => {
            console.log(`WebSocket error: ${event.message}`);
        };
        this.webSocket.onclose = (event: CloseEvent) => {
            console.log(`WebSocket closed with code ${event.code} (${event.reason})`);
            clearInterval(this.updateInterval);
        };
        this.webSocket.onopen = () => {
            console.log(`WebSocket on address ${address} opened`);

            this.webSocket.onmessage = this.handleMessage.bind(this);
            while (this.messagesQueue.length > 0) {
                this.sendMessage(this.messagesQueue.shift());
            }

            // pinging
            this.updateInterval = setInterval(() => {
                this.webSocket.send(JSON.stringify({
                    class:"InfoMessage",
                    message:""
                }))}, 5 * 1000);
        };
    }

    private handleMessage(messageEvent: MessageEvent): void {
        console.log(`Received message "${messageEvent.data}"`);

        const data: messages.Message = JSON.parse(messageEvent.data);
        this.handlersMap.get(data.class).call(this, data);
    }

    public sendMessage(message: string): void {
        if (this.webSocket.readyState === WebSocket.OPEN) {
            this.webSocket.send(message);
            console.log(`Sending message "${message}"`);
        } else if (this.webSocket.readyState === WebSocket.CONNECTING) {
            this.messagesQueue.push(message);
            console.log(`Message "${message}" put into queue`);
        }
    }

    public sendPoints(points: Array<Point>): void {
        let coordinatesArray: Array<number> = points.reduce((result: Array<number>, point: Point) => {
            return result.concat((<any>Object).values(point));
        }, []);

        this.sendMessage(JSON.stringify({
            class: "Coordinates",
            coordinates: coordinatesArray
        }));
    }

    private parseCoordinates(coordinatesMessage: messages.CoordinatesMessage): void {
        new Promise((resolve, reject) => {
            const points: Array<Point> = coordinatesMessage.coordinates            
                .reduce((result: Array<Point>, value: number, index: number, array: Array<number>) => {
                    if (index % 2 === 0) {
                        result.push(new Point(array[index], array[index + 1]));
                    }
                    return result;
                }, []);

            switch (points.length) {
                case 1: {
                    this.eventBus.emit(EVENTS.OPPONENTS_FIGURE_MOVED, { point: points[0] });
                    resolve();
                    break;
                }
                case 2: {
                    this.eventBus.emit(EVENTS.OPPONENTS_WALL_PLACED, {
                        upperOrLeft: points[0],
                        lowerOrRight: points[1]
                    });
                    resolve();
                    break;
                }
                default: {
                    reject();
                }
            }
        }).then(() => {
            this.eventBus.emit(EVENTS.YOUR_TURN);
        });
    }

    private handleInitGameMessage(initGameMessage: messages.InitGameMessage): void {
        this.eventBus.emit(EVENTS.OPPONENTHERO_NAME, initGameMessage.enemy)
        this.eventBus.emit(EVENTS.GAME_STARTED, { isFirst: initGameMessage.isFirst })
    }

    private handleFinishGameMessage(finishGameMessage: messages.FinishGameMessage): void {
        if (finishGameMessage.won) {
            alert("Вы выиграли");
        } else {
            alert("Вы проиграли");
        }
    }

    private handleInfoMessage(infoMessage: messages.InfoMessage): void {
        this.eventBus.emit(EVENTS.INFO_MESSAGE_RECEIVED, {message: infoMessage.message});
    }
}