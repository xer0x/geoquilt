const haversine = require('haversine')

/**
 *
 *
 */
async function matcher (coordinateList) {
  return bruteforce(coordinateList)
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

  for (let i=0; i < coordinateList.length; i++) {
    shortest = Infinity
    for (let j=0; j < coordinateList.length; j++) {
      if (i == j) continue; // skip - since the distance to self will be 0
      distance = haversine(coordinateList[i], coordinateList[j])
      if (distance < shortest) {
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

}

/**
 * Delaunay triangulation graph
 *
 * A graph of nearby locations. The shortest path connected to a node is that node's closest pair. It should take O(n*logn) to build.
 *
 */
function delaunayMethod (coordinateList) {

}

module.exports = {
  matcher,
  bruteforce
}
