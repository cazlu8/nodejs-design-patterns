import util from '../../util'
const thunkify = require('thunkify')
const co = require('co')
const request = thunkify(require('request'))
const fs = require('fs')
const path = require('path')
const mkdirp = thunkify(require('mkdirp'))
const readFile = thunkify(fs.readFile)
const writeFile = thunkify(fs.writeFile)
const nextTick = thunkify(process.nextTick)
const TaskQueue = require('../../TaskQueue')
const downloadQueue = new TaskQueue(6)
const processed = new Set()

function * spider (url, nesting) {
  if (processed.has(url)) {
    return nextTick()
  }
  processed.add(url)
  
  let filename = util.urlToFilename(url)
  let body
  try {
    body = yield readFile(filename, 'utf8')
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
    body = yield download(url, filename)
  }
  yield spiderLinks(url, body, nesting)
}

function spiderLinks (currentUrl, body, nesting) {
  if (nesting === 0) {
    return nextTick()
  }
  
  return callback => {
    let completed = 0, hasErrors = false
    let links = util.getPageLinks(currentUrl, body)
    if (links.length === 0) {
      return process.nextTick(callback)
    }
    
    function done (err, result) {
      if (err && ! hasErrors) {
        hasErrors = true
        return callback(err)
      }
      
      if (++completed === links.length && ! hasErrors)
        return callback()
    }
    
    links.forEach(link => {
      downloadQueue.pushTask(function * () {
        yield spider(link, nesting - 1)
        done()
      })
    })
  }
}

function download (url, filename) {
  return co(function * () {
    console.log(`Downloading ${url}`)
    let results = yield request(url)
    let body = results[1]
    yield mkdirp(path.dirname(filename))
    yield writeFile(filename, body)
    console.log(`Downloaded and saved: ${url}`)
    return body
  })
}

co(function * () {
  try {
    yield spider(process.argv[2], 1)
    console.log('Download complete')
  } catch (err) {
    console.log(err)
  }
})









