const { reqTokens } = require('../../data/helpers/reqTokens');
const spotifyWebApi = require('spotify-web-api-node');

const api = new spotifyWebApi();

const callback = (req, res) => {
	reqTokens(req.query.code)
		.then((tokens) => {
			req.session.access_token = tokens.access_token;
			req.session.refresh_token = tokens.refresh_token;
			req.session.expires_in = tokens.expires_in;

			req.session.save();
		})
		.then(() => {
			res.redirect('/home');
		})
		.catch((error) => {
			console.log(error);
		});
};

module.exports = { callback };
