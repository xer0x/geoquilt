const google_geocoder = require('google-geocoder')

function geocoder(api_key) {
  if (!api_key) throw new Error('ENOAPIKEY - api_key is missing')

  const geo = google_geocoder({key: api_key})
  const find = util.promisify(geo.find)

  async function lookup(location) {
    return find(location)
  }

  return { lookup }
}


module.exports = geocoder
