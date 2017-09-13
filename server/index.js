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
	const email = req.body.email;
	if (!username || !email) {
		return res.status(400).end();
	}
	if (!users[email]) {
		users[email] = {
			username,
			email
		};
	}
	const id = uuid();
	ids[id] = email;

	res.cookie('cookie', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.json({id});
});


app.get('/me', function (req, res) {
	const id = req.cookies['cookie'];
	const email = ids[id];
	if (!email || !users[email]) {
		return res.status(401).end();
	}

	res.json(users[email]);
});

app.post('/login', function (req, res) {
	const username = req.body.username;
	const email = req.body.email;
	if (!username || !email) {
		return res.status(400).end();
	}

	if (!users[email]) {
		return res.status(401).end();
	}
	const id = uuid();
	ids[id] = email;

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
