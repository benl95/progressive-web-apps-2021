require('dotenv').config();
const router = require('express').Router();
const axios = require('axios');
const { transformPlaylistData } = require('../../helpers/transformData');

router.get('/home', (req, res) => {
	axios
		.get('https://api.spotify.com/v1/me/playlists', {
			headers: {
				Authorization: 'Bearer ' + req.session.access_token,
			},
		})
		.then(response => {
			const data = response.data.items;
			const playlistData = transformPlaylistData(data);
			return playlistData;
		})
		.then(playlistData => {
			res.render('home', {
				title: 'Home',
				data: playlistData,
			});
		})
		.catch(error => console.log(error));
});

module.exports = router;
