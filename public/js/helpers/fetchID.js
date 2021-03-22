require('dotenv').config();
const spotifyWebApi = require('spotify-web-api-node');

const api = new spotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI,
});

async function fetchId(token) {
	api.setAccessToken(token.access_token);
	api.setRefreshToken(token.refresh_token);

	let response = api.getMe();
	let data = await response;
	const userId = data.body.id;

	return Promise.resolve(userId);
}

module.exports = { fetchId };
