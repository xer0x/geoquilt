# GeoQuilt

This is a simple exmaple of an API that looks up geo-cordinates of locations, and finds nearby locations.

## Design choices

- Geocoding uses the Google Maps API because it is easy to setup. The npm module works, but I might want to build something different because Github mentions some security issues.
- Deployment uses Zeit similarly because it is fast to get a basic API running.

## Usage

```shell

$ JSON='{"locations": [{"name": "Statue of Liberty", {"name": "Miami, FL"}]}'

$ curl -X POST localhost:3000/api/locations -d "$JSON" -H "Content-Type: application/json"

```

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

