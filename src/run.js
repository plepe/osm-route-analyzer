const GeowikiAPI = require('@geowiki-net/geowiki-api')

const analyse = require('./analyse.js')

let geowiki

module.exports = function run (config, id, callback) {
  geowiki = new GeowikiAPI(config.overpassServer)

  Object.entries(config.analyses).forEach(([analyseId, def]) => {
    geowiki.query(
      '[out:geojson];relation(' + id + ');way(r);out geom;',
      (err, data) => {
        if (err) {
          return console.error(err)
        }

        global.setTimeout(() => analyse(def, data, callback), 0)
      }
    )
  })
}
