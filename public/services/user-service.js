import Http from "../modules/http"

/**
 * Сервис для работы с пользователями
 * @module UserService
 */
class UserService {
    constructor() {
        this.user = null;
        this.users = []; //нужен ли?
    }

    /**
     * Регистрирует нового пользователя
     * @param {string} email
     * @param {string} password
     * @param {string} username
     * @return {Promise}
     */
    signup(email, username, password) {
        return Http.Post('/signup', {email, username, password});
    }

    /**
     * Авторизация пользователя
     * @param {string} username
     * @param {string} password
     * @return {Promise}
     */
    login(username, password) {
        return Http.Post('/login', {username, password});
    }

    /**
     * Проверяет, авторизован ли пользователь
     * @return {boolean}
     */
    isLoggedIn() {
        return !!this.user;
    }

    /**
     * Выход пользователя
     * @return {Promise}
     */
    logout() {
        return Http.Post('/logout', {});
    }

    /**
     * Загружает список всех пользователей
     */
    loadUsersList() {
        return Http.Get('/users')
            .then(users => {
                this.users = users;

                if (this.isLoggedIn()) {
                    this.users = this.users.map(user => {
                        user.me = user.email === this.user.email;
                        return user;
                    });
                }

                return this.users;
            });
    }


    /**
     * Загружает данные о текущем пользователе
     * @param {boolean} [force=false] - игнорировать ли кэш?
     * @return {Promise}
     */
    getData(force = false) {
        if (this.isLoggedIn() && !force) {
            return Promise.resolve(this.user);
        }

        return Http.Get('/me')
            .then(userdata => {
                this.user = userdata;
                return userdata;
            })
    }

}


export default UserService;
