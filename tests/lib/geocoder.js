var test = require('tape')
var geocoder = require('../../lib/geocoder')

require('dotenv').config()

const api_key = process.env.GOOGLE_GEOCODER_KEY

test('Geocoder has valid api key', async function (assert) {
  assert.plan(1)

  try {
    const {geocode} = geocoder(api_key)
    const response = await geocode('the statue of liberty')
    assert.notEqual(response, undefined);
  } catch (e) {
    assert.fail(e)
  }

})

test('Returns multiple possible matches', async function (assert) {
  assert.plan(2)

  try {
    const {geocode} = geocoder(api_key)
    const response = await geocode('booo, naniamo, alaska, canada')
    assert.notEqual(response, undefined)
    assert.equal(response.length, 2, 'expect 2 possible matches for Naniamo and Alaska')
  } catch (e) {
    assert.fail(e)
  }

})

test('should throw error on empty input', async function (assert) {
  assert.plan(1)

  try {
    const {geocode} = geocoder(api_key)
    const response = await geocode('')
    assert.fail('should have thrown an error')
  } catch (e) {
    assert.equals(e.message, 'Response status code is 400', 'expect a 400 error')
  }

})

test('should find the statue of liberty', async function (assert) {
  assert.plan(2)

  try {
    const {geocode} = geocoder(api_key)
    const response = await geocode('the statue of liberty')
    assert.ok(response)
    assert.equal(response.length, 1, 'should on know 1 location for the statue of liberty')
  } catch (e) {
    assert.ifError(e)
  }

})

test('geocodeLocations should return results', async function (assert) {
  assert.plan(6)

  const locations = [
    {name: 'The statue of liberty'},
    {name: 'miami, fl'},
    {name: 'nanimo, bc'}
  ]

  try {
    const {geocodeLocations} = geocoder(api_key)
    const result = await geocodeLocations(locations)

    assert.equal(result.length, locations.length, 'number of results should match the original')
    assert.ok('name' in result[0], 'results should contain name')
    assert.ok('latitude' in result[0], 'results should contain latitude')
    assert.ok('longitude' in result[0], 'results should contain longitude')
    assert.ok('error' in result[0], 'results should contain error')
    assert.false(result[0].error, 'should not have errors')
  } catch (e) {
    assert.fail(e)
  }

})
