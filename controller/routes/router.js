// Import router module
const router = require('express').Router();

// Import render modules
const { login } = require('../render/login');
const { authentication } = require('../render/authenthication');
const { callback } = require('../render/callback');
const { home } = require('../render/home');
const { detail } = require('../render/detail');

// Set GET routes
router
	.get('/', login)
	.get('/login', authentication)
	.get('/callback', callback)
	.get('/home', home)
	.get('/detail/:id', detail);

// Export router module
module.exports = router;
