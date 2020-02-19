exports.asyncFlow = function asyncFlow(generatorFunction) {
  function callback(err) {
    if (err) {
      return generator.throw(err)
    }
    const results = [].slice.call(arguments, 1)
    generator.next(results.length > 1 ? results : results[0])
  }
  const generator = generatorFunction(callback)
  generator.next()
}

exports.asyncFlowWithThunks = function (generatorFunction) {
  function callback(err) {
    if(err) {
      return generator.throw(err)
    }
    const results = [].slice.call(arguments, 1)
    const { value: thunk } = generator.next(results.length > 1 ? results : results[0])
    thunk && thunk(callback)
  }
  const generator = generatorFunction()
  const { value: thunk } = generator.next()
  thunk && thunk(callback)
}

