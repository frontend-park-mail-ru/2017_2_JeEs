'use strict';

export default class Router {
    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = new Map();

        Router.__instance = this;
    }

    register(path, view) {
        this.routes.set(path, view);
        return this;
    }

    setNotFoundPage(view) {
        this.page404 = view;
    }

    static getLocation() {
        return '/' + window.location.href.split('/').slice(-1);
    }

    start() {
        window.onpopstate = () => {
            this.go(Router.getLocation());
        };

        document.body.addEventListener('click', event => {
            if (event.target.tagName.toLowerCase() !== 'button' ||  event.target.className.toLowerCase() === "button-to-back") {
                return;
            }
            event.preventDefault();
            const pathname = event.target.value;
            this.go(pathname);
        });

        this.go(Router.getLocation());
    }

    go(urlPath) {
        let [path, getParamsString] = urlPath.split('?');
        const getParamsObject = (getParamsString) ?
            JSON.parse(`{"${getParamsString.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`) :
            {};

        let view = this.routes.get(path);
        if (!view) {
            view = this.page404;
        }

        if (Router.getLocation() !== urlPath) {
            window.history.pushState(getParamsObject, '', urlPath);
        }

        if (this.current) {
            this.current.destroy();
        }

        view.create(getParamsObject);
        this.current = view;
    }

    back() {
        window.history.back(); 
    }
}