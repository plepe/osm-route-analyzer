const GeowikiAPI = require('@geowiki-net/geowiki-api')
const turf = {
  length: require('@turf/length').default
}

let geowiki

module.exports = function run (config, id) {
  geowiki = new GeowikiAPI(config.overpassServer)

  geowiki.query(
    '[out:geojson];relation(' + id + ');way(r);out geom;',
    (err, data) => {
      if (err) { 
        return console.error(err)
      }

      global.setTimeout(() => analyze(data), 0)
    }
  )
}

function analyze (data) {
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

  Object.entries(groups).forEach(([group, length]) => {
    console.log(group + ':', length.toFixed(3) + ' km')
  })

  console.log('total:', totalLength.toFixed(3) + 'km')
}
