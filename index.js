require('dotenv').config();
const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const hbs = require('express-handlebars');
const { authSpotifyApi } = require('./public/js/helpers/spotifyAuth.js');
const { transformData } = require('./public/js/data/transformData');
const app = express();
const port = process.env.PORT;
const path = require('path');

const login = require('./controller/routes/login');
const auth = require('./controller/routes/auth');

const api = new spotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI,
});

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
	.use('/', login)
	.use('/login', auth);

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
			const playlistItems = transformData(userPlaylists.body);

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
			const trackItems = transformData(data.body);

			res.render('tracks', {
				title: 'Playlist tracks',
				data: trackItems,
			});
		})
		.catch((error) => {
			console.error(error);
		});
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
