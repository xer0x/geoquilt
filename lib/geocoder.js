const node_geocoder = require('node-geocoder')

function geocoder(api_key) {
  if (!api_key) throw new Error('ENOAPIKEY - api_key is missing')

  var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: api_key
  };

  const geocoder = node_geocoder(options)

  return {
    geocode: geocoder.geocode.bind(geocoder),
    batch: geocoder.batchGeocode.bind(geocoder),
    reverse: geocoder.reverse.bind(geocoder)
  }
}


module.exports = geocoder
