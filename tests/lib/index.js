require('dotenv').config()

var test = require('tape')
var {findClosestLocations}= require('../../lib/index')

test('findClosestLocations should return correct results', async function (assert) {
  assert.plan(1)

  const locations = [
    {name: 'The statue of liberty'},
    {name: 'new york, ny'},
    {name: 'seattle, wa'}
  ]

  try {
    const result = await findClosestLocations(locations)
    assert.fail(result, 'this test should always fail because it is not implemented yet')
    //assert.notEqual(response, undefined)
  } catch (e) {
    assert.fail(e)
  }

})
