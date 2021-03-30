require('dotenv').config();
const router = require('express').Router();
const querystring = require('querystring');
const axios = require('axios');

router.get('/callback', (req, res) => {
	const stateKey = 'spotify_auth_state';

	const code = req.query.code || null;
	const state = req.query.state || null;
	const storedState = req.cookies ? req.cookies[stateKey] : null;

	if (state === null || state !== storedState) {
		res.redirect(
			'/#' +
				querystring.stringify({
					error: 'state_mismatch',
				})
		);
	} else {
		res.clearCookie(stateKey);

		axios
			.post(
				'https://accounts.spotify.com/api/token',
				querystring.stringify({
					grant_type: 'authorization_code',
					code: code,
					redirect_uri: process.env.REDIRECT_URI,
				}),
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						Authorization:
							'Basic ' +
							Buffer.from(
								process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
							).toString('base64'),
					},
				}
			)
			.then(response => {
				const access_token = response.data.access_token;
				const refresh_token = response.data.refresh_token;

				req.session.access_token = access_token;
				req.session.refresh_token = refresh_token;
				req.session.save();

				res.redirect('home');
			})
			.catch(err => console.log(err));
	}
});

module.exports = router;
