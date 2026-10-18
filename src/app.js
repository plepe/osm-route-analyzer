const yaml = require('js-yaml')
const run = require('./run.js')

let config

window.onload = function app () {
  fetch('config.yaml')
    .then(req => req.text())
    .then(body => {
      config = yaml.load(body)

      run(config, config.id, (err, result) => {
        Object.entries(result).forEach(([analyseId, groups]) => {
          const div = document.createElement('div')
          const h1 = document.createElement('h1')
          h1.innerHTML = analyseId
          div.appendChild(h1)

          showResult(div, groups)

          document.body.appendChild(div)
        })
      })
    })
}

function showResult (dom, result) {
  const table = document.createElement('table')

  Object.entries(result).forEach(([group, length]) => {
    const tr = document.createElement('tr')

    let td = document.createElement('td')
    td.innerHTML = group
    tr.appendChild(td)

    td = document.createElement('td')
    td.innerHTML = length.toFixed(3) + ' km'
    tr.appendChild(td)

    table.appendChild(tr)
  })

  dom.appendChild(table)
}
