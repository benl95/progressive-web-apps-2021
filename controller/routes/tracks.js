const router = require('express').Router();
const { fetchTracks } = require('../../public/js/helpers/fetchTracks');
const { transformData } = require('../../public/js/data/transformData');
const spotifyWebApi = require('spotify-web-api-node');

const api = new spotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI,
});

router.get('/tracks/:id', (req, res) => {
	const tokens = {
		access_token: req.session.access_token,
		refresh_token: req.session.refresh_token,
	};

	api.setAccessToken(tokens.access_token);
	api.setRefreshToken(tokens.refresh_token);

	fetchTracks(req.params.id, tokens)
		.then((tracks) => {
			let transformTracks = transformData(tracks);
			return transformTracks;
		})
		.then((transformTracks) => {
			res.render('tracks', {
				title: 'Playlists tracks',
				data: transformTracks,
			});
		})
		.catch((error) => {
			console.log(error);
		});
});

module.exports = router;
