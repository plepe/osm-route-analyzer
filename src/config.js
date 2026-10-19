const yaml = require('js-yaml')

module.exports = {
  id: 'config',
  appInit
}

function appInit (app, callback) {
  fetch('config.yaml')
    .then(req => req.text())
    .then(body => {
      app.config = yaml.load(body)
      callback()
    })
}
