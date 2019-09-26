require('dotenv').config()

var test = require('tape')
var haversine = require('../../lib/haversine')

test('Haversine should be faster when caching is enabled', function (assert) {
  assert.plan(2)

  const iterations = 1000000
  const cacheEnabled = true
  const cacheDisabled = false

  const start = {
    name: 'The Statue of Liberty',
    latitude: 40.6892,
    longitude: -74.0445
  }

  const end = {
    name: 'Chicago, IL',
    latitude: 42.065405,
    longitude: -87.676026
  }

  let t0, t1
  let tDisabled, tEnabled

  t0 = Date.now()
  for (let i = 0; i < iterations; i++) {
    haversine(start, end, cacheDisabled)
  }
  t1 = Date.now()
  tDisabled = t1 - t0

  t0 = Date.now()
  for (let i = 0; i < iterations; i++) {
    haversine(start, end, cacheEnabled)
  }
  t1 = Date.now()
  tEnabled = t1 - t0

  assert.notEqual(tEnabled, tDisabled, 'caching should affect the timing')
  assert.ok(tDisabled < tEnabled, 'should be faster when caching is enabled')

})

