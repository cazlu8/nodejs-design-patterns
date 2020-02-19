function parallelExecution (tasks, finish, concurrency) {
  const { length } = tasks
  let running = 0 , processed = 0 , index = 0
  let hasErrors = false
  
  if (typeof concurrency === undefined) concurrency = length
  else if (concurrency > length) concurrency = length
  
  function done (err) {
    if (err) {
      hasErrors = true
      return finish(err)
    }
    if (++processed === length && !hasErrors) return finish()
    running--
    spawn()
  }
  
  function spawn () {
    while (concurrency > running && length > index) {
      const currentTask = tasks[index++]
      currentTask(done)
      running++
    }
  }
  spawn()
}

module.exports = parallelExecution
