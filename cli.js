const fs = require('fs')
const yaml = require('js-yaml')
const run = require('./src/run.js')

let config

function app () {
  fs.readFile('config.yaml', (err, body) => {
    if (err) {
      console.error(err.message)
      process.exit(1)
    }

    config = yaml.load(body)

    run(config, config.id, print)
  })
}

function print (err, result) {
  Object.entries(result).forEach(([analyseId, groups]) => {
    console.log('* ' + analyseId)
    Object.entries(groups).forEach(([group, length]) => {
      console.log(group + ':', length.toFixed(3) + ' km')
    })
  })
}

app()
