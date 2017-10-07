'use strict'

export default class EventBus {
    constructor() {
        if (EventBus.__instance) {
            return EventBus.__instance;
        }

        this.channels = new Map();

        EventBus.__instance = this;
    }

    on(eventName, callback) {
        event = this.channels.get(eventName);
        if (!event) {
            this.channels.set(eventName, []);
        }
        event.push(callback);
    }

    off(eventName, callback) {
        event = this.channels.get(eventName);
        if (!event) {
            return;
        }
        event.splice(event.indexOf(f), 1);
    }

    emit(eventName, eventData) {
        event = this.channels.get(eventName);
        if (!event) {
            return;
        }
        event.forEach(callback => {
            callback(eventData);
        });
    }
}