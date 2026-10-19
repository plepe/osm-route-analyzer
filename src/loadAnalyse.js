const fs = require('fs')
const yaml = require('js-yaml')

const analyses = {}

module.exports = function loadAnalyse (id, callback) {
  if (id in analyses) {
    return callback(null, analyses[id])
  }

  fs.readFile('analyses/' + id + '.yaml', (err, body) => {
    if (err) {
      console.error(err.message)
      process.exit(1)
    }

    analyses[id] = yaml.load(body)

    return callback(null, analyses[id])
  })
}
