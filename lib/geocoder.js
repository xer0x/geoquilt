const node_geocoder = require('node-geocoder')

function geocoder(api_key) {
  if (!api_key) throw new Error('ENOAPIKEY - api_key is missing')

  var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: api_key
  };

  const geo = node_geocoder(options)
  const geocode = (location) => geo.geocode(location)

  return { geocode }
}


module.exports = geocoder
