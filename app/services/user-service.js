import HttpSend from '../modules/http';

/**
 * Сервис для работы с пользователями
 * @class UserService
 */
class UserService {
    constructor() {
        this.baseUrl = 'https://jees-quoridor-backend.herokuapp.com';
        window.localStorage['backendUrl'] = this.baseUrl;
        this.username;
    }

    getUsername() {
        return this.username;
    }

    /**
     * Регистрирует нового пользователя
     * @param {string} email
     * @param {string} password
     * @param {string} login
     * @return {Promise}
     */
    signup(email, login, password) {
        return HttpSend(`${this.baseUrl}/signup`, 'POST', { email, login, password })
            .then(userdata => {
                this.username = userdata.login;
                return userdata;
            });
    }

    /**
     * Авторизация пользователя
     * @param {string} login
     * @param {string} password
     * @return {Promise}
     */
    login(login, password) {
        return HttpSend(`${this.baseUrl}/signin`, 'POST', { login, password })
            .then(userdata => {
                this.username = userdata.login;
                return userdata;
            });
    }

    /**
     * Выход пользователя
     * @return {Promise}
     */
    logout() {
        this.username = null;
        return HttpSend(`${this.baseUrl}/signout`, 'DELETE', {});
    }


    /**
     * Загружает данные о текущем пользователе
     * @return {Promise}
     */
    getData() {
        return HttpSend(`${this.baseUrl}/currentUser`, 'GET', {})
            .then(userdata => {
                this.username = userdata.login;
                return userdata;
            });
    }

    getScoreboard(offset, limit) {
        return HttpSend(`${this.baseUrl}/scoreBoard?offset=${offset}&limit=${limit}`, 'GET', {})
            .then(scoreboardObject => {
                return scoreboardObject.scoreboard;
            });
    }
}

export default UserService;