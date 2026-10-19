import modulekitLang from 'modulekit-lang'

module.exports = {
  id: 'lang',
  appInit
}

function appInit (app, callback) {
  modulekitLang.set('de', {}, callback)
}
