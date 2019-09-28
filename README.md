# GeoQuilt

This is a simple example of an API that takes as input a list of locations. It looks up the geo-cordinates of those locations, and then matches each location with the closest other location to it.

## Design choices

- Geocoding uses the Google Maps API because it is easy to setup. The npm module works, but I might want to build something different because Github mentions some security issues.
- Deployment uses Zeit similarly because it is fast to get a basic API running.\
- The algorithm to find the closest points uses a Delaunay Triangulation. It runs in O(nlogn) and is faster than bruteforce methods for larger datasets. The implementation uses [d3-geo-voronoi](https://github.com/Fil/d3-geo-voronoi) to construct the actual triangulation, and get the nearest neighbours.

## Usage

```shell

$ JSON='{"locations": [{"name": "Statue of Liberty", {"name": "Miami, FL"}]}'

$ curl -X POST localhost:3000/api/locations -d "$JSON" -H "Content-Type: application/json"

```

You can also use the API via the [Geoquilt Swagger UI](https://geoquilt.xer0x.now.sh/#/locations/post_locations).

## Swagger API Docs

When the service is running Swagger API docs are available on your [localhost](http://localhost:3000) or [Zeit Now](https://geoquilt.xer0x.now.sh/).

## Setup

To run this, you will need to install Zeit Now. 

```shell
$ yarn
```

To perform address lookups, you will need a Google API key. Follow Google's [documentation](https://developers.google.com/maps/documentation/embed/get-api-key) to acquire a key.

Copy the key into .env:

```shell
$ echo "GOOGLE_GEOCODER_KEY=${YOUR_GOOGLE_API_KEY}" > .env
```

## Local dev server

The local dev server will start on [localhost:3000](http://localhost:3000/)

```shell
$ yarn start
```

## Tests

You'll need to setup the GOOGLE_GEOCODER_KEY before running tests, since the API tests use the actual Google Maps API.

```shell
$ yarn test
```

The test suite is written using Tape. It's a basic test runner and with much less dependencies than Mocha or Ava.

## Deploying

You can deploy directly to Zeit Now using the yarn deploy command.

```shell
$ yarn deploy
```

Although you'll need to add your Google API key as a secret first using this command:

```shell
$ now secrets add google_geocoder_key "${YOUR_GOOGLE_API_KEY}"
```

