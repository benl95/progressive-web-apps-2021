require('dotenv').config();
const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const hbs = require('express-handlebars');
const { authSpotifyApi } = require('./public/js/helpers/spotifyAuth.js');
const app = express();
const port = process.env.PORT;

const api = new spotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI,
});

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
	res.render('login', {
		title: 'Login to Spotify',
	});
});

// Redirect to Spotify login page for authenthication
app.get('/login', (req, res) => {
	const scopes = ['user-read-email', 'user-read-private'];
	res.redirect(api.createAuthorizeURL(scopes));
});

// Get token and refresh token from Spotify API and set them for future API requests
app.get('/callback', (req, res) => {
	authSpotifyApi(req.query.code)
		.then((tokens) => {
			api.setAccessToken(tokens.access_token);
			api.setRefreshToken(tokens.refresh_token);
		})
		.then(() => {
			res.redirect('/playlists');
		})
		.catch((error) => {
			res.status(error.code);
			res.send(error.message);
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
			const playlistItems = playlistsObj.items;

			res.render('playlists', {
				title: 'Your playlists',
				data: playlistItems,
			});
		})
		.catch((error) => {
			console.error(error);
		});
});

// Fetch playlist tracks based on @params id in url
app.get('/tracks/:id', (req, res) => {
	api.getPlaylistTracks(req.params.id)
		.then((data) => {
			const dataToJson = JSON.stringify(data.body);
			const tracksObj = JSON.parse(dataToJson);
			const items = tracksObj.items;

			res.render('tracks', {
				title: 'Playlist tracks',
				trackItems: items,
			});
		})
		.catch((error) => {
			console.error(error);
		});
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
