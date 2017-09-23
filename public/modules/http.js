/**
 * Модуль, предоставляющий методы для выполнения HTTP-запросов
 * @module Http
 */

const baseUrl = `${window.location.protocol}//${window.location.host}`;

class Http {
	/**
	 * Выполняет GET-запрос по указанному адресу
	 * @param {string} address - адрес запроса
	 * @param {Function} callback - функция-коллбек
	 * @return {Promise}
	 */
	static Get(address) {
        return new Promise(function (resolve, reject) {
            const url = (Http.BaseUrl || baseUrl) + address;
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.withCredentials = true;

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (+xhr.status >= 400) {
                    reject(xhr);
                    return;
                }

                const response = JSON.parse(xhr.responseText);
                resolve(response);
            };

            xhr.send();
        });
	}

	/**
	 * Выполняет POST-запрос по указанному адресу
	 * @param {string} address - адрес запроса
	 * @param {*} body - тело запроса (объект)
	 * @return {Promise}
	 */
	static Post(address, body) {
        return new Promise(function (resolve, reject) {
            const url = (Http.BaseUrl || baseUrl) + address;
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (+xhr.status >= 400) {
                    reject(xhr);
                    return;
                }

                const response = JSON.parse(xhr.responseText);
                resolve(response);
            };

            xhr.send(JSON.stringify(body));
        });
    }
}

// Http.BaseUrl = null;

export default Http;
