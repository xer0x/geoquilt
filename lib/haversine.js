/*
 * Haversine
 *
 * This provides caching/memoization to speed up the
 * bruteforce method since it repeatedly inspects the same coordinates.
 *
 * We use a LRU(least recently used) cache to avoid having the memoization use up all the available memory.
 *
 *
 * *CACHE DOES NOT HELP*
 *
 * Sadly, caching the haversine calculation seems to do almost nothing. Benchmarks show it to be only a tiny bit faster.
 *
 * The bruteforce algorithm can be sped up a tiny bit by using a simple object hash instead of the LRU-cache for 5% gain.
 *
 */

const mod_haversine = require('haversine')
const LRU = require('lru-cache')

const cache = new LRU(process.env.DISTANCE_CACHE_SIZE || 10000)

function haversine (start, end, useCache = true) {

  let key = '', result

  if (useCache) {
    // The distance between points is always the same, so put smaller latitude first
    if (start.latitude < end.latitude) {
      key += start.latitude + ',' + start.longitude
      key += ':'
      key += end.latitude + ',' + end.longitude
    } else {
      key += end.latitude + ',' + end.longitude
      key += ':'
      key += start.latitude + ',' + start.longitude
    }
    result = cache.get(key)
    if (result) {
      return result
    }
  }

  result = mod_haversine(start, end)

  if (useCache) {
    cache.set(key, result)
  }

  return result
}

module.exports = haversine
