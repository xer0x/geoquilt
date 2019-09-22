var test = require('tape')
var geocoder = require('../lib/geocoder')

require('dotenv').config()

const api_key = process.env.GOOGLE_GEOCODER_KEY
const {lookup} = geocoder(api_key)

test('Basic geocoder works', async function (assert) {
  assert.plan(1)

  try {
    const response = await lookup("the statue of liberty")
    console.log(response)
    assert.equal(response, 'special value from google')
  } catch (e) {
    assert.fail(e)
  }

})
