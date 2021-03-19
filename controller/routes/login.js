const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('login', {
		title: 'Login to Spotify',
	});
});

module.exports = router;
