const spotifyWebApi = require('spotify-web-api-node');

const api = new spotifyWebApi();

async function fetchTracks(id, token) {
	api.setAccessToken(token.access_token);
	api.setRefreshToken(token.refresh_token);

	let response = api.getPlaylistTracks(id);
	let data = await response;
	let toJson = JSON.stringify(data);
	let toObj = JSON.parse(toJson);

	return toObj.body;
}

module.exports = { fetchTracks };
