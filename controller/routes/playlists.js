const router = require('express').Router();
const { transformData } = require('../../public/js/data/transformData');
const { fetchId } = require('../../public/js/helpers/fetchID');
const { fetchPlaylists } = require('../../public/js/helpers/fetchPlaylists');

router.get('/playlists', (req, res) => {
	const tokens = {
		access_token: req.session.access_token,
		refresh_token: req.session.refresh_token,
	};

	fetchId(tokens)
		.then((userId) => {
			let playlists = fetchPlaylists(tokens, userId);
			return playlists;
		})
		.then((playlists) => {
			let transformPlaylists = transformData(playlists);

			res.render('playlists', {
				title: 'playlists',
				data: transformPlaylists,
			});
		})
		.catch((error) => {
			console.log(error);
		});
});

module.exports = router;
