/**
 * Geocoding
 *
 */

const node_geocoder = require('node-geocoder')

/**
 * geocoder
 *
 * Creates a new Node-geocoder instance with our api key.
 * Node-geocoder supports other companies, but 'google' is hardcoded here.
 *
 * @param string api_key is a google api key
 *
 * @return object with helper functions
 */
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
    reverse: geocoder.reverse.bind(geocoder),
    geocodeLocations: geocodeLocations.bind(geocoder)
  }
}

/**
 * geocodeLocations
 *
 * @param Array locations contains a list of location objects like {name: "Las Vegas"}
 *
 * @returns Array with {name, latitude, longitude, error}
 */
async function geocodeLocations(locations) {

  const addresses = locations.map(location => location.name)
  const geocodedResults = await this.batchGeocode(addresses)

  // Pluck the fields we want using destructuring
  const coords = geocodedResults.map(({value: [{latitude, longitude},], error}) => {
    return {
      latitude,
      longitude,
      error
    }
  })

  // Add the new fields to a copy of the original locations object
  const result = locations.map((location, i) => {
    return {...locations[i], ...coords[i]}
  })

  // console.dir(result, {depth: null})

  return result
}

module.exports = geocoder
