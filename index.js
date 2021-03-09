require('dotenv').config({ path: __dirname + '/config.env' });
const express = require('express');
const handlebars = require('express-handlebars');
const port = process.env.PORT;

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

app.listen(port, () => {
	console.log(`Server is starting at ${port}`);
});
