/**
 * Модуль, предоставляющий методы для выполнения HTTP-запросов
 * @module Http
 */

const baseUrl = `${window.location.protocol}//${window.location.host}`;


//пока что внутренние методы тоже статические, ибо вебпак на нестатические ругается о_О
class Http {
    static Get(address) {
        const url = (baseUrl) + address;
        if (typeof window.fetch !== 'undefined') {
            return this._FetchGet(address, url);
        }
        return this._GetXMLHttpRequest(address, url);
    }

    static Post(address, body) {
        const url = (Http.BaseUrl || baseUrl) + address;
        if (typeof window.fetch !== 'undefined') {
            return this._FetchPost(address, body, url);
        }
        return this._PostXMLHttpRequest(address, body, url);
    }


    /**
     * Выполняет GET-запрос по указанному адресу
     * @param {string} address - адрес запроса
     * @param {string} url
     * @return {Promise}
     */
     static _GetXMLHttpRequest(address, url) {
        return new Promise(function (resolve, reject) {
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
    };

    /**
     * Выполняет POST-запрос по указанному адресу
     * @param {string} address - адрес запроса
     * @param {*} body - тело запроса (объект)
     * @param {string} url
     * @return {Promise}
     */
    static _PostXMLHttpRequest(address, body, url) {
        return new Promise(function (resolve, reject) {
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
    };

    /**
     * Выполняет GET-запрос по указанному адресу с использованием fetch
     * @param {string} address - адрес запроса
     * @return {Promise}
     */
    static _FetchGet(address, url) {
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then(function (response) {
                if (response.status >= 400) {
                    throw response;
                }

                return response.json();
            });
    };

    /**
     * Выполняет POST-запрос по указанному адресу с использованием fetch
     * @param {string} address - адрес запроса
     * @param {*} body - тело запроса (объект)
     * @return {Promise}
     */
    static _FetchPost(address, body, url) {
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(function (response) {
                if (response.status >= 400) {
                    throw response;
                }

                return response.json();
            });
    };
}

// Http.BaseUrl = null;

export default Http;
