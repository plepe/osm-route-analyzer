const run = require('./run.js')

import App from '@geowiki-net/geowiki-lib-app'

App.modules = [...App.modules, require('./config.js'), ...require('../modules.js')]

const app = new App()

app.initModules(() => {
  app.loadCssFiles()

  app.on('state-apply', init)

  app.init(app.getInitState())
})

function init () {
  const id = app.state.current.id

  if (!id) {
    return
  }

  run(app.config, id, (err, result) => {
    Object.entries(result).forEach(([analyseId, groups]) => {
      const div = document.createElement('div')
      const h1 = document.createElement('h1')
      h1.innerHTML = analyseId
      div.appendChild(h1)

      showResult(div, groups)

      document.body.appendChild(div)
    })
  })
}

function showResult (dom, result) {
  const table = document.createElement('table')

  Object.entries(result).forEach(([group, data]) => {
    const tr = document.createElement('tr')

    let td = document.createElement('td')
    td.innerHTML = group
    tr.appendChild(td)

    td = document.createElement('td')
    td.innerHTML = data.length.toFixed(3) + ' km'
    tr.appendChild(td)

    table.appendChild(tr)
  })

  dom.appendChild(table)
}
