const Http = window.Http;

/**
 * Сервис для работы с юзерами
 * @module UserService
 */
class UserService {
    constructor() {
        this.user = null;
        this.users = [];
    }

    /**
     * Регистрирует нового пользователя
     * @param {string} email
     * @param {string} password
     * @param {string} username
     * @param {Function} callback
     */
    signup(email, username, password, callback) {
        Http.Post('/signup', {email, username, password}, callback);
    }

    /**
     * Авторизация пользователя
     * @param {string} username
     * @param {string} password
     * @param {Function} callback
     */
    login(username, password, callback) {
        Http.Post('/login', {username, password}, callback);
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
     * @param {Function} callback
     */
    login(callback) {
        Http.Post('/logout', {}, callback);
    }

    /**
     * Загружает список всех пользователей
     * @param callback
     */
    loadUsersList(callback) {
        Http.Get('/users', function (err, users) {
            if (err) {
                return callback(err, users);
            }

            this.users = users;

            if (this.isLoggedIn()) {
                this.users = this.users.map(user => {
                    if (user.email === this.user.email) {
                        user.me = true;
                    }
                    return user;
                });
            }

            callback(null, this.users);
        }.bind(this));
    }

}


export default UserService;
