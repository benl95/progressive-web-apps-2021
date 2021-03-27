require('dotenv').config();
const router = require('express').Router();
const { generateRandomString } = require('../../helpers/generateRandomString');
const querystring = require('querystring');

router.get('/redirect', (req, res) => {
	const stateKey = 'spotify_auth_state';
	const state = generateRandomString(16);
	res.cookie(stateKey, state);

	const scope = [
		'user-read-email',
		'user-read-private',
		'playlist-read-collaborative',
	];

	res.redirect(
		'https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id: process.env.CLIENT_ID,
				scope: scope,
				redirect_uri: process.env.REDIRECT_URI,
				state: state,
			})
	);
});

module.exports = router;
