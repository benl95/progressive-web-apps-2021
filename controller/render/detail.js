const { fetchTracks } = require('../../public/js/helpers/fetchTracks');
const { transformData } = require('../../public/js/data/transformData');

const detail = (req, res) => {
	const tokens = {
		access_token: req.session.access_token,
		refresh_token: req.session.refresh_token,
	};

	fetchTracks(req.params.id, tokens)
		.then((tracks) => {
			let transformTracks = transformData(tracks);
			return transformTracks;
		})
		.then((transformTracks) => {
			res.render('tracks', {
				title: 'Playlists tracks',
				data: transformTracks,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

module.exports = { detail };
