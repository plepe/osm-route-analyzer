const turf = {
  length: require('@turf/length').default
}

module.exports = function analyze (data, callback) {
  let totalLength = 0
  let groups = {}

  data.features.forEach(feature => {
    const length = turf.length(feature)
    totalLength += length

    const tags = feature.properties

    group = 'other'
    if (tags.highway) {
      group = tags.highway
    }
    if (tags.highway == 'cycleway') {
      if (tags.segregated == 'no') {
        group = 'mixed'
      } else {
        group = 'cycleway'
      }
    }

    if (!(group in groups)) {
      groups[group] = 0
    }

    groups[group] += length

    //console.log(feature.id, group, length)
  })

  callback(null, groups)
//
//  console.log('total:', totalLength.toFixed(3) + 'km')
}
