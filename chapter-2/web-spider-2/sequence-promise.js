function sequential (promises = []) {
  if (promises.length === 0) return
  
  return promises.reduce((prev, cur, index) => {
    return prev.then(() => Promise.resolve(cur))
  }, Promise.resolve())
}
