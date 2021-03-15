require('dotenv').config();
const spotifyWebApi = require('spotify-web-api-node');

const api = new spotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI,
});

function authSpotifyApi(code) {
	return api.authorizationCodeGrant(code).then((data) => {
		const tokens = {
			access_token: data.body['access_token'],
			refresh_token: data.body['refresh_token'],
		};

		return tokens;
	});
}

module.exports = { authSpotifyApi };
