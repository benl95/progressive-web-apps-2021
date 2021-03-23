const error = (req, res) => {
	try {
		res.render('error', {
			title: '404, Page Not Found',
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports = { error };
