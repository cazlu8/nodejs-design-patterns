function* makeGenerator() {
  yield 'Hello World';
  console.log('Re-entered');
}

const gen = makeGenerator()
const value = gen.next().value
console.log(value)

function* fruitGenerator() {
  yield 'apple';
  yield 'orange';
  return 'watermelon';
}

const newFruitGenerator = fruitGenerator()
console.log(newFruitGenerator.next())
console.log(newFruitGenerator.next())
console.log(newFruitGenerator.next())

