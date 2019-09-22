const {findClosestLocations} = require('../lib')

/**
 * # POST /api/location
 *
 * Expects the req.body to be JSON with the following format:
 *
 * {
 *  "locations": [ { "name": "Statue of Liberty" }, { "name": "Miami, FL" }, ... ]
 * }
 *
 * The response body will be in the following format:
 *
 * HTTP 200 Success:
 * {
 *   "locations": [
 *     {"name": "Statue of Liberty", "": ""},
 *     ...
 *   ],
 *   "geocode_errors": []
 * }
 *
 * HTTP 400 Failures:
 * {
 *   "error": ""
 * }
 */
module.exports = (req, res) => {

  try {
    const {locations} = json.parse(req.body)
    const result = findClosestLocations(locations)
    res.status(200).json(result)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }

}
