require('dotenv').config()

var test = require('tape')
var matcher = require('../../lib/matcher')

test('Bruteforce cannot find match with only 1 location', async function (assert) {
  assert.plan(3)

  const coordinateList = [
    {
      name: 'The Statue of Liberty',
      latitude: 40.6892,
      longitude: -74.0445
    }
  ]

  const matchedList = await matcher.bruteforce(coordinateList)
  assert.ok('name' in matchedList[0], 'Matcher has name field');
  assert.equal(matchedList[0].name, 'The Statue of Liberty', 'Matcher returns name of start');
  assert.false('match' in matchedList[0], 'should not have match field');

})

test('Bruteforce matches two locations', async function (assert) {
  assert.plan(4)

  const coordinateList = [
    {
      name: 'The Statue of Liberty',
      latitude: 40.6892,
      longitude: -74.0445
    },
    {
      name: 'Calgary, AB',
      latitude: 51.043002,
      longitude: -114.063049
    }
  ]

  const matchedList = matcher.bruteforce(coordinateList)
  assert.ok('name' in matchedList[0], 'should have name field');
  assert.equal(matchedList[0].name, 'The Statue of Liberty', 'should have the name of start');
  assert.ok('match' in matchedList[0], 'should have a match');
  assert.equal(matchedList[0].match, 'Calgary, AB', 'match should contain name of end');

})

test('Bruteforce matches three locations', async function (assert) {
  assert.plan(10)

  const coordinateList = [
    {
      name: 'The Statue of Liberty',
      latitude: 40.6892,
      longitude: -74.0445
    },
    {
      name: 'Calgary, AB',
      latitude: 51.043002,
      longitude: -114.063049
    },
    {
      name: 'Chicago, IL',
      latitude: 42.065405,
      longitude: -87.676026
    }
  ]

  const matchedList = matcher.bruteforce(coordinateList)

  // Statue of Liberty results
  assert.ok('name' in matchedList[0], 'should have name field');
  assert.equal(matchedList[0].name, 'The Statue of Liberty', 'should have the name of start');
  assert.ok('match' in matchedList[0], 'should have a match');
  assert.equal(matchedList[0].match, 'Chicago, IL', 'Statue should be closer to Chicago than Calgary');

  // Calgary results
  assert.equal(matchedList[1].name, 'Calgary, AB', 'should have the same name as input');
  assert.ok('match' in matchedList[1], 'should have a match');
  assert.equal(matchedList[1].match, 'Chicago, IL', 'Calgary should be closer to Chicago than Statue');

  // Chicago results
  assert.equal(matchedList[2].name, 'Chicago, IL', 'should have the same name as input');
  assert.ok('match' in matchedList[1], 'should have a match');
  assert.equal(matchedList[2].match, 'The Statue of Liberty', 'Chicago should be closer to the Statue of Liberty');
})

test('Bruteforce ignores the same locations', async function (assert) {
  assert.plan(12)

  const coordinateList = [
    {
      name: 'The Statue of Liberty',
      latitude: 40.6892,
      longitude: -74.0445
    },
    {
      name: 'The Statue of Liberty',
      latitude: 40.6892,
      longitude: -74.0445
    },
    {
      name: 'The Statue of Liberty',
      latitude: 40.6892,
      longitude: -74.0445
    },
    {
      name: 'Chicago, IL',
      latitude: 42.065405,
      longitude: -87.676026
    }
  ]

  const matchedList = matcher.bruteforce(coordinateList)

  // 1. Statue of Liberty results
  assert.equal(matchedList[0].name, 'The Statue of Liberty', 'should have the name of start');
  assert.ok('match' in matchedList[0], 'should have a match');
  assert.equal(matchedList[0].match, 'Chicago, IL', 'Statue should be closer to Chicago than duplicate of itself');

  // 2. Statue of Liberty results
  assert.equal(matchedList[1].name, 'The Statue of Liberty', 'should have the name of start');
  assert.ok('match' in matchedList[1], 'should have a match');
  assert.equal(matchedList[1].match, 'Chicago, IL', 'Statue should be closer to Chicago than duplicate of itself');

  // 3. Statue of Liberty results
  assert.equal(matchedList[2].name, 'The Statue of Liberty', 'should have the name of start');
  assert.ok('match' in matchedList[2], 'should have a match');
  assert.equal(matchedList[2].match, 'Chicago, IL', 'Statue should be closer to Chicago than duplicate of itself');

  // Chicago results
  assert.equal(matchedList[3].name, 'Chicago, IL', 'should have the same name as input');
  assert.ok('match' in matchedList[3], 'should have a match');
  assert.equal(matchedList[3].match, 'The Statue of Liberty', 'Chicago should be closer to the Statue of Liberty');
})

test('DelaunayMethod can find matches', async function (assert) {
  assert.plan(10)

  const coordinateList = [
    {
      name: 'The Statue of Liberty',
      latitude: 40.6892,
      longitude: -74.0445
    },
    {
      name: 'Calgary, AB',
      latitude: 51.043002,
      longitude: -114.063049
    },
    {
      name: 'Chicago, IL',
      latitude: 42.065405,
      longitude: -87.676026
    },
    {
      name: 'Springfield, IL',
      latitude: 43.065405,
      longitude: -84.676026
    },
    {
      name: 'Springfield, WA',
      latitude: 62.065405,
      longitude: -91.676026
    },
  ]

  const matchedList = matcher.delaunayMethod(coordinateList)

})

