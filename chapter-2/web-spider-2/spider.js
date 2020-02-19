const util = require('../../util')
const thunkify = require('thunkify')
const co = require('co')
const request = thunkify(require('request'))
const fs = require('fs')
const path = require('path')
const mkdirp = thunkify(require('mkdirp'))
const readFile = thunkify(fs.readFile)
const writeFile = thunkify(fs.writeFile)
const nextTick = thunkify(process.nextTick)
const processed = new Set()

function* spider(url, nesting) {
  if (processed.has(url))
       return nextTick()
  
  processed.add(url)
  const filename = util.urlToFilename(url)
  let body
  try {
    body = yield readFile(filename, 'utf8')
  } catch(err) {
    if(err.code !== 'ENOENT') {
      throw err
    }
    body = yield download(url, filename)
  }
  yield spiderLinks(url, body, nesting)
}

function* spiderLinks(currentUrl, body, nesting) {
  if(nesting === 0) {
    return nextTick()
  }
  
  const links = util.getPageLinks(currentUrl, body)
  const { length } = links
  for(let i = 0; i < length; i++) {
     yield spider(links[i], nesting - 1)
  }
}

function* download(url, filename) {
  console.log(`Downloading ${url}`)
  const response = yield request(url)
  const body = response[1]
  yield mkdirp(path.dirname(filename))
  yield writeFile(filename, body)
  console.log(`Downloaded and saved ${url}`)
  return body
}

co(function* () {
  try {
    yield spider(process.argv[2], 1)
    console.log('Download complete')
  } catch(err) {
    console.log(err)
  }
})



