const router = require('express').Router();
const { transformData } = require('../../public/js/data/transformData');
const { fetchId } = require('../../public/js/helpers/fetchID');
const { fetchPlaylists } = require('../../public/js/helpers/fetchPlaylists');
const spotifyWebApi = require('spotify-web-api-node');

const api = new spotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI,
});

router.get('/playlists', (req, res) => {
	const tokens = {
		access_token: req.session.access_token,
		refresh_token: req.session.refresh_token,
	};

	api.setAccessToken(tokens.access_token);
	api.setRefreshToken(tokens.refresh_token);

	fetchId(tokens)
		.then((userId) => {
			let playlists = fetchPlaylists(tokens, userId);
			return playlists;
		})
		.then((playlists) => {
			let transformPlaylists = transformData(playlists);

			res.render('playlists', {
				title: 'playlists',
				data: transformPlaylists,
				access_token: tokens.access_token,
				refresh_token: tokens.refresh_token,
			});
		})
		.catch((error) => {
			console.log(error);
		});
});

module.exports = router;
