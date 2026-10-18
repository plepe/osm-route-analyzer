const yaml = require('js-yaml')

let config

window.onload = function app () {
  fetch('config.yaml')
    .then(req => req.text())
    .then(body => {
      config = yaml.load(body)
      console.log(config)
    })
}
