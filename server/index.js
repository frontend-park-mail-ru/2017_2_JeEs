const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
	res.send('404');
});

let listener = app.listen(process.env.PORT || '8080', () => {
	console.log("Listening port " + listener.address().port);
});
