const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();

app.engine(
	'hbs',
	handlebars({
		extname: 'hbs',
		defaultLayout: 'main',
		layoutsDir: __dirname + '/views/layouts',
	})
);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Home',
	});
});

app.listen(3000, () => {
	console.log('Server is starting at 3000');
});
