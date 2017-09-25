import Http from "../modules/http"

/**
 * Сервис для работы с пользователями
 * @module UserService
 */
class UserService {
    constructor() {
        this.user = null;
        this.users = []; //нужен ли?

        if (window.location.host === 'jees-quoridor.herokuapp.com' || window.location.host === 'quoridor-jees.herokuapp.com') {
            Http.BaseUrl = 'https://jees-quoridor-backend.herokuapp.com';
        }
    }

    /**
     * Регистрирует нового пользователя
     * @param {string} email
     * @param {string} password
     * @param {string} login
     * @return {Promise}
     */
    signup(email, login, password) {
        return Http.Post('/signup', {email, login, password});
    }

    /**
     * Авторизация пользователя
     * @param {string} login
     * @param {string} password
     * @return {Promise}
     */
    login(login, password) {
        return Http.Post('/signin', {login, password});
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
        return Http.Post('/signout', {});
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

        return Http.Post('/currentUser')
            .then(userdata => {
                this.user = userdata;
                return userdata;
            })
    }

}


export default UserService;
