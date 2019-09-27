const haversine = require('./haversine')
const geoVoronoi = require('d3-geo-voronoi')

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
    if (coordinateList[i].error) continue; // skip - if location lookup had an error
    shortest = Infinity
    for (let j=0; j < coordinateList.length; j++) {
      if (coordinateList[j].error) continue; // skip - if location lookup had an error
      if (i == j) continue; // skip - since the distance to self will be 0
      distance = haversine(coordinateList[i], coordinateList[j])
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


}

/**
 * Delaunay triangulation graph
 *
 * A graph of nearby locations. The shortest path connected to a node is that node's closest pair. It should take O(n*logn) to build the graph.
 *
 * https://stackoverflow.com/questions/1185408/converting-from-longitude-latitude-to-cartesian-coordinates
 *
 */
function delaunayMethod (coordinateList) {

  var sites = [[10,0],[10,10],[3,5],[-2,5],[0,0]];
  var triangulation = geoVoronoi.geoVoronoi().mesh(sites)
  console.log(triangulation)
  /*
  	{ type: 'MultiLineString', coordinates: [ [ [ 3, 5 ], [ -2, 5 ] ], [ [ 3, 5 ], [ 0, 0 ] ], [ [ -2, 5 ], [ 0, 0 ] ], [ [ 10, 10 ], [ -2, 5 ] ], [ [ 10, 10 ], [ 3, 5 ] ], [ [ 10, 0 ], [ 3, 5 ] ], [ [ 10, 0 ], [ 0, 0 ] ], [ [ 10, 0 ], [ 10, 10 ] ] ] }
  );
  test.end();
  */
}

module.exports = {
  matcher,
  bruteforce,
  delaunayMethod
}
