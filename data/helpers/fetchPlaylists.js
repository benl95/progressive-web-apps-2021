const spotifyWebApi = require('spotify-web-api-node');

const api = new spotifyWebApi();

async function fetchPlaylists(token, id) {
	api.setAccessToken(token.access_token);
	api.setRefreshToken(token.refresh_token);

	let response = api.getUserPlaylists(id);
	let data = await response;
	const toJson = JSON.stringify(data);
	const toObj = JSON.parse(toJson);

	return toObj.body;
}

module.exports = { fetchPlaylists };
