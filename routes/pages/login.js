const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('login', {
		title: 'Log in',
	});
});

module.exports = router;
