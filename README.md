# GeoQuilt

This is a simple exmaple of an API that looks up geo-cordinates of locations, and finds nearby locations.

## Design choices

- Geocoding uses the Google Maps API because it is easy to setup. The npm module google-geocoder works, but has security problems because it has quite ancient dependencies. I haven't written my own API client, but I might  want to.
- Deployment uses Zeit similarly because it is fast to get a basic API running.

## Setup

To run this, you will need to install Zeit Now. 

```shell
$ yarn
```

To perform address lookups, you will need a Google API key. Follow Google's [documentation](https://developers.google.com/maps/documentation/embed/get-api-key) to acquire a key.

Copy the key into .env:

```shell
GOOGLE_GEOCODER_KEY=${YOUR KEY HERE}
```

## Local dev server

```shell
$ yarn start
```

## Tests

```shell
$ yarn test
```

## Deploying

You can deploy directly to Zeit Now using the yarn deploy command.

```shell
$ yarn deploy
```

