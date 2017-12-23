'use strict';

export default class EventBus {
    private static __instance: EventBus;
    private channels: Map<string, Array<Function>>;

    constructor() {
        if (EventBus.__instance) {
            return EventBus.__instance;
        }

        this.channels = new Map<string, Array<Function>>();

        EventBus.__instance = this;
    }

    on(eventName, callback) {
        let events: Array<Function> = this.channels.get(eventName);
        if (!events) {
            this.channels.set(eventName, []);
            events = this.channels.get(eventName);
        }
        events.push(callback);
    }

    off(eventName: string, callback: Function) {
        const events: Array<Function> = this.channels.get(eventName);
        if (!events) {
            return;
        }
        events.splice(events.indexOf(callback), 1);
    }

    remove(eventName: string) {
        this.channels.delete(eventName);
    }

    emit(eventName: string, data: Object = {}) {
        const events: Array<Function> = this.channels.get(eventName);
        if (!events) {
            return;
        }

        events.forEach(callback => {
            callback(data);
        });
    }
}