function parallel (promises = [], catchError) {
  const tasksLength = promises.length
  if (tasksLength === 0)
      return
  
  promises.forEach(p => p.catch(catchError))
  
  for (let i = tasksLength - 1; 0 <= i; i--)
       Promise.resolve(promises[i])
}

module.exports = parallel
