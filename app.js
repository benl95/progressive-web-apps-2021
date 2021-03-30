require('dotenv').config();
const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const login = require('./routes/pages/login');
const redirect = require('./routes/pages/redirect');
const callback = require('./routes/pages/callback');
const home = require('./routes/pages/home');
const detail = require('./routes/pages/detail');
const offline = require('./routes/pages/offline');

const app = express();

app.set('view engine', 'hbs')
	.set('views', __dirname + '/views')
	.engine(
		'hbs',
		hbs({
			extname: 'hbs',
			defaultLayout: 'main',
		})
	);

app.use(express.static(path.join(__dirname, '/public')))
	.use(compression())
	.use(cors())
	.use(cookieParser())
	.use(express.urlencoded({ extended: true }))
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
	.use(login)
	.use(redirect)
	.use(callback)
	.use(home)
	.use(detail)
	.use(offline);

app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
