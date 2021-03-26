# Spotify PWA

### Progressive Web Apps @cmda-minor-web · 20-21

This is a simple application that is made using the Spotify API. The application
retrieves the playlist data of a user. User will be able to view their playlists
on the homepage and playlist tracks on a detail page.

## Learning goals

-  _You understand the difference between client side and server side rendering
   and you can apply server side rendering in your application_
-  _You understand how a Service Worker works and you can implement it in your
   application._
-  _You understand how the critical render path works and how you can optimize
   it for a better runtime and / or perceived performance._

[Rubric with learning goals](https://icthva.sharepoint.com/:x:/r/sites/FDMCI_EDU__CMD20_21_Minor_Web_5i7j73jt/_layouts/15/Doc.aspx?sourcedoc=%7B276F53A7-2531-4006-8AD2-08C9A82D3A11%7D&file=PWA%202021%20Rubric.xlsx&action=edit&mobileredirect=true&wdPreviousSession=92686bea-446f-40e3-9303-33fa3f832b82&wdOrigin=TEAMS-ELECTRON.teams.undefined)

## Installation

1. Navigate to desired directory `cd <directory>`
2. Clone the repo locally
   `git clone https://github.com/benl95/progressive-web-apps-2021.git`

For security reasons, the spotify key has not been included, feel free to create
your own for free.

[Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)

> Create an app Copy the Client ID, Client Secret, Redirect URI and register a
> callback URL Create an .env in the root

```
CLIENT_SECRET = 'client-secret-here';
ClIENT_ID = 'client-id-here';
REDIRECT_URI = 'callback-uri-here';
```

To run the project locally Node.js is required

```
// Install the dependencies
npm i

// Run a local server
npm run

```

## Features

-  User can view their playlists
-  User can view the tracks of a playlists

## External data

This project will use the
[Spotify API](https://developer.spotify.com/documentation/web-api/) to retrieve
playlists data of the current authenthicated user.

There are four ways of obtaining authorization:

1. [Authorization Code Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow)
2. [Authorization Code Flow with PKCE](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow-with-proof-key-for-code-exchange-pkce)
3. [Client Credentials Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow)
4. [Implicit Grant](https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow)

## License

MIT
