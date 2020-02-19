const LazyBox = g => ({
  map: f => LazyBox(() => f(g())),
  chain: f => f(g()),
  fold: f => f(g())
})

function countLetters (acc, cur) {
  acc[cur] ? acc[cur]++ : acc[cur] = 1
  return acc
}

function process (word) {
  return LazyBox(() => word)
    .map(word => word.trim())
    .map(trimmed => trimmed.split(''))
    .map(letters => letters.map(char => char.trim()))
    .map(trimmedLetters => trimmedLetters.filter(char => char !== ''))
    .map(filteredLetters => filteredLetters.reduce(countLetters, {}))
    .fold(x => x)
}

function maxCountLetter (word) {
  function getMaxChar (prev, next) {
    return word.split(prev).length > word.split(next).length ? prev : next
  }
  
  return LazyBox(() => word)
    .map(word => word.split(''))
    .map(letters => letters.reduce(getMaxChar))
    .fold(x => x)
}

console.log(maxCountLetter('la casa de papel'))
console.log(process('i am a software engineer'))
