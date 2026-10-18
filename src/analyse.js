const twigRender = require('./twigRender')
const turf = {
  length: require('@turf/length').default
}

module.exports = function analyse (def, data, callback) {
  let totalLength = 0
  let groups = {}

  data.features.forEach(feature => {
    const length = turf.length(feature)

    const data = {
      tags: feature.properties
    }

    const group = twigRender(def.feature.group, data).trim()

    if (!(group in groups)) {
      groups[group] = 0
    }

    groups[group] += length
  })

  callback(null, groups)
}
