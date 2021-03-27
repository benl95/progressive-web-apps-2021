require('dotenv').config();
const router = require('express').Router();
const axios = require('axios');
const { transformTracksData } = require('../../helpers/transformData');

router.get('/detail/:id', (req, res) => {
	const id = req.params.id;

	axios
		.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
			headers: {
				Authorization: 'Bearer ' + req.session.access_token,
			},
		})
		.then(response => {
			const data = response.data;
			console.log(data.items);
			const tracksData = transformTracksData(data.items);
			return tracksData;
		})
		.then(tracksData => {
			res.render('detail', {
				title: 'Detail',
				data: tracksData,
			});
		})
		.catch(error => console.log(error));
});

module.exports = router;
