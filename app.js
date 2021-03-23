require('dotenv').config();
const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
const app = express();
const port = process.env.PORT;
const path = require('path');

const router = require('./controller/routes/router');

app.set('view engine', 'hbs')
	.set('views', __dirname + '/controller/views')
	.engine(
		'hbs',
		hbs({
			extname: 'hbs',
			defaultLayout: 'main',
		})
	);

app.use(express.static(path.join(__dirname, '/public')))
	.use(
		session({
			secret: 'secret-key',
			resave: true,
			saveUninitialized: false,
			cookie: {
				secure: 'auto',
			},
		})
	)
	.use(router);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});