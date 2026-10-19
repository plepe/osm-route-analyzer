const async = require('async')

const loadAnalyse = require('./loadAnalyse.js')
const analyse = require('./analyse.js')
const twigRender = require('./twigRender')

module.exports = function run (app, id, callback) {
  let indexAnalyse

  const data = {
    'this': 'relation(' + id + ')'
  }

  async.parallel([
    done => app.geowiki.query(
      '[out:geojson];' + data.this + ';out body geom;',
      (err, data) => {
        examinees = data
        done()
      }
    ),
    done => loadAnalyse(
      'index',
      (err, analyse) => {
        indexAnalyse = analyse
        done()
      }
    )
  ], (err) => {
    data.tags = examinees.features[0].properties

    const analyseId = twigRender(indexAnalyse.chooseAnalyser, data).trim()

    loadAnalyse(analyseId, (err, analyser) => {
      runAnalyse(analyser, data, app, callback)
    })
  })
}

function runAnalyse (analyser, data, app, callback) {
  const result = {}

  async.eachOf(analyser.analyses, (def, analyseId, done) => {
    const query = twigRender(def.query, data)

    app.geowiki.query(
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
