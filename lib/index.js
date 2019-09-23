const geocoder = require('./geocoder')

const api_key = process.env.GOOGLE_GEOCODER_KEY

const {geocode} = geocoder(api_key);

module.exports = {
  findClosestLocations
}
