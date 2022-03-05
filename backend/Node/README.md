# Node backend for Spotify Gen

## Set-up

**Requirement**

- NodeJS latest v
- PostgreSQL

**Postgres setup locally**

- Install and run PostgreSQL
- Create a db called 'euphony' without quotation marks
- Use the default postgres user

**Environment Variable**

Create a .env file in ./backend/Node folder, ask backend devs for them:

- PORTNUM=4000
- SPOTIFY_CLIENT_ID=
- SPOTIFY_CLIENT_SECRET=
- MAPBOX_TOKEN=
- OPEN_WEATHER_KEY=
- PG_CONNECTION_URL =

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
