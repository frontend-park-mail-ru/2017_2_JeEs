'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(body.json());
app.use(cookie());

const users = {};
const ids = {};

app.post('/signup', function (req, res) {
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	if (
		!email || !username || !password ||
		!email.match(/@/) ||
		!username.match(/^\S{4,}$/) ||
		!password.match(/^\S{4,}$/)

	) {
		return res.status(400).json({error: 'Невалидные данные пользователя'});
	}
	if (users[username]) {
		return res.status(400).json({error: 'Пользователь уже существует'});
	}

	const id = uuid();
	ids[id] = username;
	users[username] = {password, email, score: 0};


	res.cookie('cookie', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.json({id});
});

app.post('/login', function (req, res) {
	const username = req.body.username;
	const password = req.body.password;

	if (!password || !username) {
		return res.status(400).json({error: 'Не указан E-Mail или пароль'});
	}
	if (!users[username] || users[username].password !== password) {
		return res.status(400).json({error: 'Неверный E-Mail и/или пароль'});
	}

	const id = uuid();
	ids[id] = username;

	res.cookie('cookie', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
});

app.get('/currentUser', function (req, res) {
	const id = req.cookies['cookie'];
	const username = ids[id];
	if (!username || !users[username]) {
		return res.status(401).end();
	}

	res.json({id});
});

app.get('/users', function (req, res) {
	const scorelist = Object.values(users)
		.sort((l, r) => r.score - l.score)
		.map(user => {
			return {
				email: user.username,
				score: user.score,
			}
		});

	res.json(scorelist);
});

app.post('/logout', function (req, res) {
	res.cookie('cookie', null, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(200).json(null);
});

app.use(express.static('public'));

app.get('*', (req, res) => {
	res.send('404');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Server listening port ${port}`);
});
