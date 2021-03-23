const login = (req, res) => {
	res.render('login', {
		title: 'Login to your Spotify account',
	});
};

module.exports = { login };
