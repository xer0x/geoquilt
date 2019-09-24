const geocoder = require('./geocoder')
const {matcher} = require('./matcher')

const api_key = process.env.GOOGLE_GEOCODER_KEY

const {geocodeLocations} = geocoder(api_key)

/**
 * findClosestLocations
 *
 * @param Array locations list of {name: "address.."} objects
 *
 * @returns Array list with a new 'closest' location added to each location
 */
async function findClosestLocations(locations) {
  if (!Array.isArray(locations)) throw new Error('locations should be an array of addresses')

  const coordinatesList = await geocodeLocations(locations)
  const matchedList = await matcher(coordinatesList)

  return matchedList
}

module.exports = {
  findClosestLocations,
  geocodeLocations
}
