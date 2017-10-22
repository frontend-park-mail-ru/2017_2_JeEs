'use strict';

export default class Router {
    constructor(rootElement) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = new Map();
        this.rootElement = rootElement;

        Router.__instance = this;
    }

    register(path, view) {
        this.routes.set(path, view);
        return this
    }

    setNotFoundPage(view) {
        this.page404 = view;
    }

    start() {
        // window.onpopstate = event => {
        //     this.go(window.location.pathname);
        // };

        this.rootElement.addEventListener('click', event => {
            if (event.target.tagName !== 'a') {
                return;
            }
            event.preventDefault();
            const pathname = event.target.pathname;
            this.go(pathname);
        });

        this.go(window.location.pathname);
    }

    go(path) {
        let view = this.routes.get(path);
        if (!view) {
            view = this.page404
        }

        if (window.location.pathname !== path) {
            window.history.pushState({}, '', path);
        }

        if (this.current) {
            this.current.destroy();
        }

        view.create();
        this.current = view
    }
}