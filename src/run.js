const GeowikiAPI = require('@geowiki-net/geowiki-api')

const analyze = require('./analyze.js')

let geowiki
const def = {
  feature: {
    'group': '{{ (tags.highway == "cycleway" and tags.segregated == "no" ? "mixed" : tags.highway)|default("other") }}'
  }
}

module.exports = function run (config, id, callback) {
  geowiki = new GeowikiAPI(config.overpassServer)

  geowiki.query(
    '[out:geojson];relation(' + id + ');way(r);out geom;',
    (err, data) => {
      if (err) { 
        return console.error(err)
      }

      global.setTimeout(() => analyse(def, data, callback), 0)
    }
  )
}
