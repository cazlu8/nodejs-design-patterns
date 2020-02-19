function promisify (callbackBasedApi) {
  return function convert () {
    const args = [...arguments]
    return new Promise ((resolve, reject) => {
      args.push((err, result) => {
        if (err)
           return reject(err)
        
        if (arguments.length <= 2)
            resolve(result)
        else
            resolve([].slice.call(arguments, 1))
      })
      
      callbackBasedApi.apply(null, args)
    })
  }
}

function sequentialExecution (tasks, finalCallBack) {
  const { length } = tasks
  
  function iterate (index) {
    if (index === length)
        return finalCallBack()
    
    const currentTask = tasks[index]
    currentTask((err) => {
        if (err)
            return finalCallBack(err)
      
      iterate(index  + 1)
    })
  }
  iterate(0)
}

function parallelExecution (tasks, finalCallBack, concurrency) {
  const { length } = tasks
  let index, running , completed, hasErrors = false
  index = running = completed = 0
  
  if (typeof concurrency ===  undefined)
      concurrency = length
  else if (concurrency > length)
       concurrency = length
  
  function done (err) {
    if (err) {
      hasErrors = true
      return finalCallBack(err)
    }
    if (++completed === length && !hasErrors)
        return finalCallBack()
    
    running--
    spawn()
  }
  
  function spawn () {
    while (concurrency >= running && index < length) {
      const currentTask = tasks[index++]
      currentTask(done)
      running++
    }
  }
  
  spawn()
}

function sequentialPromiseExecutionVersion1 (tasks) {
  let promise = tasks.reduce((prev, task) => {
    return prev.then(() => {
      return task()
    })
  }, Promise.resolve());
  
  promise.then(() => {
    //All tasks completed
  })
}

function sequentialPromiseExecutionVersion2 (tasks) {
  let promise = Promise.resolve()
  tasks.forEach(x => promise = promise.then(() => x()))
  promise.then(() => {
    //All tasks completed
  })
  return promise
}

function parallelPromiseExecution (promises) {

}





















