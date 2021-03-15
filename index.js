require('dotenv').config();
const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const hbs = require('express-handlebars');
const port = 3000;

const api = new spotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI,
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

// Redirect to Spotify login page for authenthication
app.get('/login', (req, res) => {
	const scopes = ['user-read-email', 'user-read-private'];
	res.redirect(api.createAuthorizeURL(scopes));
});

// Get token and refresh token from Spotify API and set them for future API requests
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

// Fetch playlist tracks based on @params id in url
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

// Fetch playlists of user
app.get('/playlists', (req, res) => {
	api.getMe()
		.then((data) => {
			const id = data.body.id;
			return id;
		})
		.then((id) => {
			const userPlaylists = api.getUserPlaylists(id);
			return userPlaylists;
		})
		.then((userPlaylists) => {
			const dataToJson = JSON.stringify(userPlaylists.body);
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

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
