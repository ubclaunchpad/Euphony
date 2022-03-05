# Node backend for Spotify Gen

## Set-up

**Requirement**

- NodeJS latest v

**Environment Variable**

Create a .env file in ./backend/Node folder, ask backend devs for them:

- PORT=4000
- SPOTIFY_CLIENT_ID=
- SPOTIFY_CLIENT_SECRET=
- MAPBOX_TOKEN=
- OPEN_WEATHER_KEY=

**Install**
Run `npm install` to install all dependencies

## Running local server

```sh
`npm start` or `yarn start`       # start server on 4000 w ts-node-dev
`npm dev` or `yarn dev`           # start development on 4000 w nodemon
`npm build` or `yarn build`       # build the server
```

## Swagger API Documentation

after running `npm start`, API documentation can be accessed here:
http://localhost:4000/api-docs/
