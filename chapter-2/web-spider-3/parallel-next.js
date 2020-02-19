function parallel (tasks, finish, concurrency) {
  let running = 0, processed = 0, index = 0
  const { length } = tasks
  
  if (typeof concurrency === undefined) concurrency = length
  else if (concurrency > length) concurrency = length
  
  function done () {
    if(++processed === length)
        return finish()
    running--, processed++
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

module.exports = parallel


