const EventEmitter = require('events').EventEmitter
const fs = require('fs')

class FindPattern extends EventEmitter {
  constructor (regex) {
    super()
    this.pattern = regex
    this.files = []
  }
  
  addFile (file) {
    this.files.push(file)
    return this
  }
  
  find () {
    this.files.forEach(file => {
      fs.readFile(file, 'utf8', (err, content) => {
        err && this.emit('error', err)
        this.emit('fileread', file)
        let match
        if (match = content.match(this.pattern)){
            match.forEach(x => this.emit('found', file, x))
        }
      })
    })
    return this
  }
  
}

module.exports = FindPattern
