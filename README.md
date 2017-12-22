# Quoridor

## Description
Реализация настольной игры Quoridor с некоторыми новыми фичами

## Master application [![Build Status](https://travis-ci.org/frontend-park-mail-ru/2017_2_JeEs.svg?branch=master)](https://travis-ci.org/frontend-park-mail-ru/2017_2_JeEs)
### [https://quoridor-jees.herokuapp.com](https://quoridor-jees.herokuapp.com)

## Developed application [![Build Status](https://travis-ci.org/frontend-park-mail-ru/2017_2_JeEs.svg?branch=develop)](https://travis-ci.org/frontend-park-mail-ru/2017_2_JeEs)
### [https://jees-quoridor.herokuapp.com](https://jees-quoridor.herokuapp.com)


## Members
* [@barzug](https://github.com/barzug) - Барсуков Сергей
* [@OkciD](https://github.com/OkciD) - Байков Юрий
* [@EvgeniaNevtrinosova](https://github.com/EvgeniaNevtrinosova) - Невтриносова Евгения
* [@erm0shin](https://github.com/erm0shin) - Ермошин Даниил

## Mentors

* [@vileven](https://github.com/vileven)
* [@8coon](https://github.com/8coon)


## API

| Действие | Метод | url | Тело запроса | Тело ответа |
| --- | --- | --- | --- | --- |
| Зарегистрироваться | Post | /signup | {"login":"user", "email":"user@mail.ru", "password":"12345"} | {"login":"user", "email":"user@mail.ru"} |
| Авторизоваться | Post | /signin | {"login":"user", "password":"12345"} | {"login":"user", "email":"user@mail.ru"} |
| Разлогиниться | Delete | /signout |  | {"info":"Successful logout"} |
| Запросить пользователя текущей сессии | Get | /currentUser |  | {"login":"user", "email":"user@mail.ru"} |

## Docker
`sudo docker build -t "quoridor-frontend" ./` - build  
`sudo docker run -p 80:80 -d quoridor-frontend` - run
