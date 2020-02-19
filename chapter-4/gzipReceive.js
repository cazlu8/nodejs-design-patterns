import http from 'http'
const fs = require('fs')
const zlib = require('zlib')
const crypto = require('crypto')

const server = http.createServer((req, res) => {
  const filename = req.headers.filename
  console.log('File request received: ' + filename)
  
  req
    .pipe(zlib.createGunzip())
    .pipe(crypto.createDecipher('aes192', 'a_shared_secret'))
    .pipe(fs.createWriteStream(`clone_of_${filename}`))
    .on('finish', () => {
      res.writeHead(201, { 'Content-Type': 'text/plain' })
      res.end('That\'s it\n')
      console.log(`File saved: ${filename}`)
    })
})

server.listen(3000, () => console.log('Listening'))
