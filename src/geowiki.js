const yaml = require('js-yaml')
const GeowikiAPI = require('@geowiki-net/geowiki-api')

module.exports = {
  id: 'geowiki',
  requireModules: ['config'],
  appInit
}

function appInit (app) {
  app.geowiki = new GeowikiAPI(app.config.overpassServer)
}
