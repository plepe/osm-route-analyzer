const yaml = require('js-yaml')
const run = require('./run.js')

let config

window.onload = function app () {
  fetch('config.yaml')
    .then(req => req.text())
    .then(body => {
      config = yaml.load(body)

      run(config, config.id, (err, result) => {
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

        document.body.appendChild(table)
      })
    })
}
