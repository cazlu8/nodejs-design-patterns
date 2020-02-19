const EventEmitter = require('events').EventEmitter
const fs = require('fs')

module.exports = (files = [], regex) => {
  const emitter = new EventEmitter()
  files.forEach(function (file) {
    fs.readFile(file, 'utf8', (err, content) => {
      if (err)
        return emitter.emit('error', err)

      emitter.emit('fileread', file)
      let match
      if (match = content.match(regex))
        match.forEach(elem => emitter.emit('found', file, elem))
    })
  })
  return emitter
}

