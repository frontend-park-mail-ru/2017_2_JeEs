export default class Router {
    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = new Map();
        this.history = window.history;
        this.page404 = () => {
            alert("404"); //сделать вьюшку под это
        };
        this.steps = 0;

        Router.__instance = this;
    }

    register(path, view) {
        this.routes[path] = view;
    }

    start() {

    }      // запустить роутер
    go(path) {
        // по идее 1 аргумент объект состояния, а второй заголовок состояния
        this.history.pushState(null, '', path);
        this.navigate(path);
        this.currentUrl = path;
        return this;
    }

    back() {

    }       // переход назад по истории браузера
    forward() {
    }    // переход вперёд по истории браузера
}