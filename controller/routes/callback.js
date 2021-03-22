const router = require('express').Router();
const spotifyWebApi = require('spotify-web-api-node');
const { reqTokens } = require('../../public/js/helpers/reqTokens');

const api = new spotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI,
});

router.get('/callback', (req, res) => {
	reqTokens(req.query.code)
		.then((tokens) => {
			api.setAccessToken(tokens.access_token);
			api.setRefreshToken(tokens.refresh_token);

			req.session.access_token = tokens.access_token;
			req.session.refresh_token = tokens.refresh_token;
			req.session.save();
		})
		.then(() => {
			res.redirect('/playlists');
		})
		.catch((error) => {
			console.log(error);
		});
});

module.exports = router;
