const router = require('express').Router();
const spotifyWebApi = require('spotify-web-api-node');

const api = new spotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI,
});

router.get('/', (req, res) => {
	const scopes = ['user-read-email', 'user-read-private'];
	res.redirect(api.createAuthorizeURL(scopes));
});

module.exports = router;
