require('dotenv').config()

var test = require('tape')
var {findClosestLocations}= require('../../lib/index')

test('findClosestLocations should return correct results', async function (assert) {
  assert.plan(2)

  const locations = [
    {name: 'The statue of liberty'},
    {name: 'new york, ny'},
    {name: 'seattle, wa'},
    {name: ''},
  ]

  try {
    const result = await findClosestLocations(locations)
    assert.ok(result, 'should return a result')
    assert.equal(locations.length, result.length, 'input length should match output length')
  } catch (e) {
    assert.fail(e)
  }

})

test('findClosestLocations should be okay with garbage inputs', async function (assert) {
  assert.plan(3)

  const locations = [
    {name: ';;;;;;;;;;;;;;'},
    {name: ''},
    {name: 'seattle, wa'}
  ]

  try {
    const result = await findClosestLocations(locations)
    assert.ok(result, 'should return a result')
    assert.equal(locations.length, result.length, 'input length should match output length')
    assert.notOk('match' in locations[0], 'should not find any matches')
  } catch (e) {
    assert.fail(e)
  }

})
