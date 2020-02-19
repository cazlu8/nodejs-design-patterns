function asyncDivision (dividend, divisor, cb) {
  return new Promise((resolve, reject) => {               // [1]
    process.nextTick(() => {
      const result = dividend / divisor
      if (isNaN(result) || !Number.isFinite(result)) {
        const error = new Error('Invalid operands')
        if (cb) { cb(error) }                            // [2]
        return reject(error)
      }
      
      if (cb) { cb(null, result) }                       // [3]
      resolve(result)
    })
  })
}

// callback oriented usage
asyncDivision(10, 2, (error, result) => {
  if (error) {
    return console.error(error);
  }
  console.log(result);
})

// promise oriented usage
asyncDivision(21, 11)
  .then(result => console.log(result))
  .catch(error => console.error(error));

