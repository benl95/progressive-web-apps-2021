require('dotenv').config();
const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const hbs = require('express-handlebars');
const port = 3000;

const api = new spotifyWebApi({
	clientId: '5470641b38f34b889f84c88912b013a0',
	clientSecret: '9e364847d4ca45c6b782ca346de3c51b',
	redirectUri: 'http://localhost:3000/callback/',
});

const app = express();

app.engine(
	'hbs',
	hbs({
		extname: 'hbs',
		defaultLayout: 'main',
		layoutsDir: __dirname + '/views/layouts',
	})
);

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	res.render('home', {
		title: 'Home',
	});
});

app.get('/detail/:id', (req, res) => {
	api.getPlaylistTracks(req.params.id)
		.then((data) => {
			const dataToJson = JSON.stringify(data.body);
			const tracksObj = JSON.parse(dataToJson);
			const items = tracksObj.items;

			res.render('detail', {
				title: 'Detail',
				trackItems: items,
			});
		})
		.catch((error) => {
			console.error(error);
		});
});

app.get('/playlists', (req, res) => {
	api.getMe()
		.then((data) => {
			const id = data.body.id;
			return id;
		})
		.then((id) => {
			return api.getUserPlaylists(id);
		})
		.then((data) => {
			const dataToJson = JSON.stringify(data.body);
			const playlistsObj = JSON.parse(dataToJson);
			const items = playlistsObj.items;

			res.render('playlists', {
				title: 'Playlists',
				playlistItems: items,
			});
		})
		.catch((error) => {
			console.error(error);
		});
});

app.get('/login', (req, res) => {
	const scopes = ['user-read-email', 'user-read-private'];
	res.redirect(api.createAuthorizeURL(scopes));
});

app.get('/callback', (req, res) => {
	const code = req.query.code;

	api.authorizationCodeGrant(code).then(
		(data) => {
			const token = data.body['access_token'];
			const refresh_token = data.body['refresh_token'];

			api.setAccessToken(token);
			api.setRefreshToken(refresh_token);

			res.redirect('/playlists');
		},
		(err) => {
			res.status(err.code);
			res.send(err.message);
		}
	);
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
