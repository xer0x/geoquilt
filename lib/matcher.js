const haversine = require('./haversine')
const geoVoronoi = require('d3-geo-voronoi')

/**
 *
 *
 */
async function matcher (coordinateList) {
  // return bruteforce(coordinateList)
  return delaunayMethod(coordinateList)
}

/**
 * bruteforce
 *
 * This is a O(n^2) attempt to compare all the locations.
 * The code runs synchronously, and ties down the event loop while it looks for the closest match.
 *
 * @returns Array with the coordinateList, each location has a new field 'match'
 */
function bruteforce (coordinateList) {
  let distance, shortest

  let useCache = process.env.DISTANCE_CACHE_ENABLED

  for (let i=0; i < coordinateList.length; i++) {
    if (coordinateList[i].error) continue; // skip - if location lookup had an error
    shortest = Infinity
    for (let j=0; j < coordinateList.length; j++) {
      if (coordinateList[j].error) continue; // skip - if location lookup had an error
      if (i == j) continue; // skip - since the distance to self will be 0
      distance = haversine(coordinateList[i], coordinateList[j], useCache)
      if (distance < shortest && distance > 0) {
        shortest = distance
        coordinateList[i].match = coordinateList[j].name
      }
    }
  }

  return coordinateList
}

/**
 * sortedList
 * 
 * This attempts to sort the locations to improve performance.
 *
 * Ideas from - https://en.wikipedia.org/wiki/Closest_pair_of_points_problem
 * 
 * @param Array coordinateList 
 */
function sortedList (coordinateList) {
  // Not implemented since delaunayMethod should outperform this
}

/**
 * Delaunay triangulation graph
 *
 * A graph of nearby locations. The shortest path connected to a node is that node's closest pair. It should take O(n*logn) to build the graph.
 *
 * Searching the graph for matches is also O(n*logn) or O(logn) to find an individual match
 *
 * For small inputs, this method seems to be slower than the bruteforce approach. I'm assuming that's because it is quite math heavy to do all the trigonometry to build the delaunay triangulation.
 *
 * Ideas from - https://en.wikipedia.org/wiki/Closest_pair_of_points_problem
 *
 * Converting from Cartesian to GeoCoordinates -  https://stackoverflow.com/questions/1185408/converting-from-longitude-latitude-to-cartesian-coordinates
 *
 */
function delaunayMethod (coordinateList) {

  const findDistance = (start, end) => haversine(coordinateList[start], coordinateList[end])

  // Build array of coordinates: [[lat, long], ...]
  const nodes = coordinateList.map(({latitude, longitude}) => [latitude, longitude])

  // Assemble delaunay triangulation, and retrieve neighbors from graph
  const neighbors = geoVoronoi.geoDelaunay(nodes).neighbors

  let shortest, dist, neighbor
  for (let i=nodes.length-1; i >= 0; i--) {
    dist = Infinity
    shortest = Infinity
    if (!neighbors[i]) continue;
    // Find the closest neighbor
    for (let j=neighbors[i].length-1; j >= 0; j--) {
      neighbor = neighbors[i][j]
      dist = findDistance(i, neighbor)
      if (dist < shortest) {
        shortest = dist
        coordinateList[i].match = coordinateList[neighbor].name
      }
    }
  }

  return coordinateList
}

module.exports = {
  matcher,
  bruteforce,
  delaunayMethod
}
