const yaml = require('js-yaml')

const analyses = {}

module.exports = function loadAnalyse (id, callback) {
  if (id in analyses) {
    return callback(null, analyses[id])
  }

  fetch('analyses/' + id + '.yaml')
    .then(req => req.text())
    .then(body => {
      analyses[id] = yaml.load(body)

      return callback(null, analyses[id])
    })
}
