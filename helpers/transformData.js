const {
	millisToMinutesAndSeconds,
} = require('./utils/millisToSecondsAndMinutes');

function transformPlaylistData(data) {
	const result = data.map(val => {
		const item = {
			playlist: {
				name: val.name,
				id: val.id,
				img: val.images[0].url,
				owner: val.owner.display_name,
			},
		};
		return item;
	});
	return result;
}

function transformTracksData(data) {
	const result = data.map(val => {
		const item = {
			track: {
				name: val.track.name,
				duration: millisToMinutesAndSeconds(val.track.duration_ms),
				artist: val.track.artists[0].name,
			},
		};
		return item;
	});
	return result;
}

module.exports = { transformPlaylistData, transformTracksData };
