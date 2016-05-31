// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'Sunshine Interior Design',
	'brand': 'Sunshine Interior Design',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.png',
	'views': 'templates/views',
	'view engine': 'jade',

	'emails': 'templates/emails',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'wysiwyg additional plugins': 'paste',
  'wysiwyg additional options': {
    'paste_data_images': true
	}

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	moment: require('moment'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes

keystone.set('routes', require('./routes'));


// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
	logo_src: '/images/logo-email.png',
	logo_width: 120,
	logo_height: 120,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#ffe561',
		buttons: {
			color: '#fff',
			background_color: '#ffe561',
			border_color: '#ffe561',
		},
	},
});

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));
// Use Mailgun
keystone.set('email transport', 'mailgun');
keystone.set('mailgun api key', 'key-9bd18424bd1c15671dff1875b6125214');
keystone.set('mailgun domain', 'mg.sunshineinteriordesign.com');


// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	galleries: 'galleries',
	enquiries: 'enquiries',
	users: 'users',
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
