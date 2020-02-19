const fs = require('fs')
const path = require('path')
const async = require('./async-flow')

/*async.asyncFlow(function* (callback) {
  const fileName = path.basename(__filename)
  const dir = `${__dirname}\\${fileName}`
  const myself = yield fs.readFile(dir, 'utf8', callback)
  yield fs.writeFile(`${__dirname}\\clone_of_${fileName}`, myself, callback)
  console.log('Clone created')
}) */

async.asyncFlowWithThunks(function* () {
  const readFileThunk = thunkify(fs.readFile)
  const writeFileThunk = thunkify(fs.writeFile)
  const fileName = path.basename(__filename)
  const dir = `${__dirname}//${fileName}`
  const myself = yield readFileThunk(dir, 'utf8')
  yield writeFileThunk(`${__dirname}//clone_of_${fileName}`, myself)
  console.log("Clone created")
})

function thunkify (fn) {
  return function () {
    const args = [...arguments]
    return function (callback) {
      args.push(callback)
      fn.apply(null, args)
    }
  }
}



