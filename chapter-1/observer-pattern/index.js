const FindPattern = require('./generic-observable')
const findPatternObject = new FindPattern(/\d+/g)
findPatternObject
  .addFile(`${__dirname}\\data.txt`)
  .find()
  .on('fileread', file => console.log(file + ' was read'))
  .on('found', (file, match) => console.log('Matched "' + match +
    '" in file ' + file))
  .on('error', err => {throw new Error(err)})

process.on('uncaughtException', (err) => {
  console.log('An error occurred:', err)
  process.exit()
})
