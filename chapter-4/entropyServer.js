const Chance = require('chance')
const chance = new Chance()

require('http').createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })

  function generateMore () {
    while (chance.bool({ likelihood: 95 })) {
      let shouldContinue = res.write(chance.string({ length: (16 * 1024) - 1 }))
      if (!shouldContinue) {
        console.log('Backpressure')
        return res.once('drain', generateMore)
      }
    }
    res.end('\nThe end...\n', () => console.log('All data was sent'))
  }

  generateMore()
}).listen(8080, () => console.log('Listening on http://localhost:8080'))
