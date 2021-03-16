require('dotenv').config();

function scopes() {
	return ['user-read-email', 'user-read-private'];
}

module.exports = {
	scopes,
};
