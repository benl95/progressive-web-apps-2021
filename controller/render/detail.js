const { fetchTracks } = require('../../data/helpers/fetchTracks');
const { transformData } = require('../../data/utils/transformData');

const detail = (req, res) => {
	const token = {
		access_token: req.session.access_token,
		refresh_token: req.session.refresh_token,
	};

	fetchTracks(req.params.id, token)
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
			if (error) {
				res.render('error', {
					title: '404, Page Not Found',
				});
			}
		});
};

module.exports = { detail };
