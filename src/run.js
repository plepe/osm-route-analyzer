const GeowikiAPI = require('@geowiki-net/geowiki-api')
const async = require('async')

const analyse = require('./analyse.js')
const twigRender = require('./twigRender')

let geowiki

module.exports = function run (config, id, callback) {
  geowiki = new GeowikiAPI(config.overpassServer)
  const result = {}

  async.eachOf(config.analyses, (def, analyseId, done) => {
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

        global.setTimeout(() => analyse(def, data, (err, r) => {
          if (err) { return done(err) }
          result[analyseId] = r
          done()
        }), 0)
      }
    )
  }, (err) => {
    callback(err, result)
  })
}
