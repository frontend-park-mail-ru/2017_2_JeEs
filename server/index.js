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

app.post('/auth', function (req, res) {
	const username = req.body.username;
	const password = req.body.password;
	if (users[username]) {
		return res.status(400).end();
	}

	users[username] = password;
	const id = uuid();
	ids[id] = username;

	res.cookie('cookie', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.json({id});
});


app.get('/me', function (req, res) {
	const id = req.cookies['cookie'];
	const username = ids[id];
	if (!username || !users[username]) {
		return res.status(401).end();
	}

	res.json({id});
});

app.post('/login', function (req, res) {
	const username = req.body.username;
	const password = req.body.password;

	if (!users[username]) {
		return res.status(401).end();
	}
	if (users[username] !== password) {
		return res.status(400).end();
	}

	const id = uuid();
	ids[id] = username;

	res.cookie('cookie', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.json({id});
});

app.get('/logout', function (req, res) {
	res.cookie('cookie', null, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.json(null);
});

app.use(express.static('public'));

app.get('*', (req, res) => {
	res.send('404');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Server listening port ${port}`);
});
