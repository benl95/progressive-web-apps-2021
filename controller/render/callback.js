require('dotenv').config();
const { reqTokens } = require('../../public/js/helpers/reqTokens');

const callback = (req, res) => {
	reqTokens(req.query.code)
		.then((tokens) => {
			req.session.access_token = tokens.access_token;
			req.session.refresh_token = tokens.refresh_token;
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
