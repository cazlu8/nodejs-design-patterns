function serialExecution (tasks, finish) {
  const { length } = tasks
  let index = 0
  
  function done (err) {
    if (err) return finish(err)
    iterate(index++)
  }
  
  function iterate (index) {
    if (index === length)
        return finish()
    
    const currentTask = tasks[index]
    currentTask(done)
  }
  iterate(index)
}

module.exports = serialExecution
