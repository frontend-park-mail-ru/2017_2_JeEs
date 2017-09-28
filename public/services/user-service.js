import Http from "../modules/http"

/**
 * Сервис для работы с пользователями
 * @module UserService
 */
class UserService {
    constructor() {
        /**
         * Закомментить для обращения к серверу
         */
        Http.BaseUrl = 'https://jees-quoridor-backend.herokuapp.com';
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
        return Http.Post('/currentUser')
    }

    /**
     * Выход пользователя
     * @return {Promise}
     */
    logout() {
        return Http.Post('/signout', {});
    }


    /**
     * Загружает данные о текущем пользователе
     * @return {Promise}
     */
    getData() {
        return Http.Post('/currentUser')
            .then(userdata => {
                return userdata;
            })
    }

}

export default UserService;
