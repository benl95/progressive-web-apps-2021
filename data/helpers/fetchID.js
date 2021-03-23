const spotifyWebApi = require('spotify-web-api-node');

const api = new spotifyWebApi();

async function fetchId(token) {
	api.setAccessToken(token.access_token);
	api.setRefreshToken(token.refresh_token);

	let response = api.getMe();
	let data = await response;
	const userId = data.body.id;

	return userId;
}

module.exports = { fetchId };
