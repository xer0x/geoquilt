const geocoder = require('./geocoder')

const api_key = process.env.GOOGLE_GEOCODER_KEY

const {geocode} = geocoder(api_key)

async function findClosestLocations(locations) {
  if (!Array.isArray(locations)) throw new Error('locations should be an array of addresses')
  throw new Error('missing logic')
}

//function GeocodeLocations

module.exports = {
  findClosestLocations
}
