require('dotenv').config();
const spotifyWebApi = require('spotify-web-api-node');

const api = new spotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI,
});

const authentication = (req, res) => {
	const scopes = ['user-read-email', 'user-read-private'];
	res.redirect(api.createAuthorizeURL(scopes));
};

module.exports = { authentication };
