require('dotenv').config()

var test = require('tape')
var locations = require('../../api/locations')


test('locations returns errors', async function (assert) {
  assert.plan(3)

  // Mock out (req, res)
  const req = {}
  const res = {
    status: (code) => {
      assert.notEqual(code, 200, 'status code should not be 200')
      assert.equal(code, 400, 'status code should be 400')
      return res
    },
    json: (result) => {
      assert.ok('error' in result, 'should return an error message');
      return res
    }
  }

  try {
    await locations(req, res)
  } catch (e) {
    assert.fail(e)
  }

})

