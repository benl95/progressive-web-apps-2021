# Progressive Web App

## Application description

In this course we'll learn how to create a Progressive Web App from. This
application is made using Node.js, Express and the Express-Handlebars templating
engine. The data in the app is retrieved from the
[Spotify Web API](https://developer.spotify.com/documentation/web-api/). Users
will be able to log in to authenthicate themselves and their playlists will be
retrieved with the tracks in that playlist

## Live link

Visit the live version of the app here:

[Spotify PWA](https://spotifypwa.herokuapp.com/)

## Features

## Build scripts

<details>
<summary>Build scripts</summary>
<br>
Inside my project I use two different build scripts. The build scripts bundle my CSS and Client-side Javascript and minifies them. The minified files will be placed in the `public` directory and used for production.

```
"prebuild:css": "rimraf \"public/css\"",
"prebuild:js": "rimraf \"public/js\"",
"build:css": "node ./src/build-scripts/build-css.js",
"build:js": "node ./src/build-scripts/build-js.js"
```

</details>

<details>
<summary>Dev</summary>
<br>
To make the workflow in development more efficient I use the `nodemon` package. This package restarts the server when a change is made to the source code. This make all changes immediately visible, thus speeding up the development of the application.

```
"start": "node app.js",
"dev": "nodemon app",
```

</details>

## Manifest & Service Worker

<details>
<summary>Manifest</summary>
<br>
The goal of this project is to refactor our existing application from WAFS to a Progressive Web App. To make it possible for users to install the application to their mobile device a `manifest` file is created. This file passes information to the browsers about your PWA and how it should behave when installed to a mobile device.
</details>

<details>
<summary>Service worker</summary>
<br>
A Service worker essentially acts as a proxy server that sits between the web application, the browser and the network (when available). They are intended, among other things, to enable the creation of effective offline expereiences.

The Service Worker lifecycle consists of the following events:

-  Installing
-  Installed
-  Activating
-  Activated
-  Reduntant

In my service worker I use the `install`, `activation` and `fetch` event
listeners. These event listeners ensures that the application can be used
offline. Currently I use the service worker to pre-cache my CSS, Client-Side
Javascript, the homepage and a offline page when the network is unavailable.

</details>

## Critcial Render Path Optimization

<details>
<summary>Lighthouse Audit Results</summary>
<br>

<img width="778" alt="Schermafbeelding 2021-03-31 om 09 57 09" src="https://user-images.githubusercontent.com/43675725/113114972-37e5c500-920c-11eb-9270-ed44a4fb230d.png">

<img width="772" alt="Schermafbeelding 2021-03-31 om 09 57 00" src="https://user-images.githubusercontent.com/43675725/113115012-43d18700-920c-11eb-85b8-3abefaa675e6.png">
</details>

<details>
<summary>Optimizing with lazy loading and picture source sets</summary>
<br>
My application fetches all the playlists of the logged in users from the Spotify API and renders this to the screen. This API call fetches a lot of images for the playlist covers which can slow down the application. 
To optimize this I use `lazy` loading attribute for my images. To optimize the images in my web application further, I use the `picture` element of HTML. This makes it possible to render different image sizes depending on the screen width.

```
<picture>
   <source media="(min-width: 768px)" srcset="{{this.playlist.largeImg}}"/>
   <source media="(min-width: 320px)" srcset="{{this.playlist.smallImg}}"/>
   <img src="{{this.playlist}}" alt="Playlist cover" loading="lazy">
</picture>
```

</details>

<details>
<summary>Optimizing with gzp</summary>
<br>
To optimize the rendered files from the server I use the NPM package `compression`.

```js
const compression = require('compression');
app.use(compression());
```

</details>

## Installation

```
git clone https://github.com/benl95/progressive-web-apps-2021.git
```

```
npm install
```

To run the project locally a `.env` file is required with your Client ID, Client
Secret and Redirect URI. For security reasons I did not include my own. Feel
free to create your own by registering your application on:

[Spotify Developer Dashboard](https://developer.spotify.com/dashboard/login)

In the `.env` file pass the key as following:

```
PORT='port-here'
CLIENT_ID='client-id-here'
CLIENT_SECRET='client-secret-here'
REDIRECT_URI='redirect-uri-here
```

## Obtaining Authorization

To be able to fetch data from the API an `access token` and `refresh token` is
required. To obtain authorization there are four ways:

-  Authorization Code Flow
-  Authorization Code Flow with PKCE
-  Client Credentials Flow
-  Implicit Grant

Since this application is made with Node.js I will be using the
[Authorization Code Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow).

<details>
<summary>Fetching data from the API</summary>
<br>

```js
axios
	.get('https://api.spotify.com/v1/me/playlists', {
		headers: {
			Authorization: 'Bearer ' + req.session.access_token,
		},
	})
	.then(response => {
		const data = response.data.items;
		const playlistData = transformPlaylistData(data);
		return playlistData;
	});
```

</details>

## Build

Dependencies:

-  Axios
-  Compression
-  Cookie-parser
-  Cors
-  Dotenv
-  Express
-  Express-handlebars
-  Express-session
-  Querystring

Dev dependencies:

-  Nodemon
-  Rimraf
-  Gulp
-  Gulp-autoprefixer
-  Gulp-clean-css
-  Gulp-concat
-  Gulp-uglify-es

## License

MIT
