/**
 * API
 *
 * Zeit Now Serverless docs: https://zeit.co/docs/v2/serverless-functions/supported-languages/#node.js
 *
 */
const {findClosestLocations} = require('../lib')

/**
 * # GET/POST /api/location
 *
 * Headers:
 *   content-type: 'application/json'
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
module.exports = async (req, res) => {
  try {
    if (!req.body) throw new Error('missing request body -- expected json')
    const {locations} = req.body
    const result = await findClosestLocations(locations)
    res.status(200).json(result)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}
