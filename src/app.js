const yaml = require('js-yaml')
const run = require('./run.js')

let config

window.onload = function app () {
  fetch('config.yaml')
    .then(req => req.text())
    .then(body => {
      config = yaml.load(body)

      run(config, config.id)
    })
}
