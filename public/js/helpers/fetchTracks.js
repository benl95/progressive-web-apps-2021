require('dotenv').config();
const spotifyWebApi = require('spotify-web-api-node');

const api = new spotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI,
});

async function fetchTracks(id, token) {
	api.setAccessToken(token.access_token);
	api.setRefreshToken(token.refresh_token);

	let response = api.getPlaylistTracks(id);
	let data = await response;
	let toJson = JSON.stringify(data);
	let toObj = JSON.parse(toJson);

	return await toObj.body;
}

module.exports = { fetchTracks };
