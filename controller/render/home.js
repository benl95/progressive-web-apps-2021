const { transformData } = require('../../data/utils/transformData');
const { fetchId } = require('../../data/helpers/fetchID');
const { fetchPlaylists } = require('../../data/helpers/fetchPlaylists');

const home = (req, res) => {
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
};

module.exports = { home };
