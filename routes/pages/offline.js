const router = require('express').Router();

router.get('/offline', (req, res) => {
	res.render('offline', {
		title: '404 Not Found',
	});
});

module.exports = router;
