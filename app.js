require('dotenv').config();
const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
const app = express();
const path = require('path');
const compression = require('compression');

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
	.use(compression())
	.use(
		session({
			secret: 'secret-key',
			resave: true,
			saveUninitialized: false,
			cookie: {
				secure: 'auto',
			},
			maxAge: (3600 / 2) * 1000,
		})
	)
	.use(router);

app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
