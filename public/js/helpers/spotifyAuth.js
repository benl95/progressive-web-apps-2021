require('dotenv').config();
const spotifyWebApi = require('spotify-web-api-node');

const api = new spotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI,
});

function authSpotifyApi(code) {
	return api.authorizationCodeGrant(code).then((data) => {
		const token = data.body['access_token'];
		const refresh_token = data.body['refresh_token'];

		const tokens = [token, refresh_token];

		return tokens;
	});
}

module.exports = { authSpotifyApi };
