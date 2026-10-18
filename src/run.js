const GeowikiAPI = require('@geowiki-net/geowiki-api')

const analyse = require('./analyse.js')
const twigRender = require('./twigRender')

let geowiki

module.exports = function run (config, id, callback) {
  geowiki = new GeowikiAPI(config.overpassServer)

  Object.entries(config.analyses).forEach(([analyseId, def]) => {
    const data = {
      'this': 'relation(' + id + ')'
    }

    const query = twigRender(def.query, data)

    geowiki.query(
      '[out:geojson];' + query,
      (err, data) => {
        if (err) {
          return console.error(err)
        }

        global.setTimeout(() => analyse(def, data, callback), 0)
      }
    )
  })
}
