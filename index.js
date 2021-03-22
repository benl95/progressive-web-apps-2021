require('dotenv').config();
const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
const app = express();
const port = process.env.PORT;
const path = require('path');

const login = require('./controller/routes/login');
const auth = require('./controller/routes/auth');
const callback = require('./controller/routes/callback');
const playlists = require('./controller/routes/playlists');
const tracks = require('./controller/routes/tracks');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/controller/views');
app.engine(
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
	.use(login)
	.use(auth)
	.use(callback)
	.use(playlists)
	.use(tracks);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
