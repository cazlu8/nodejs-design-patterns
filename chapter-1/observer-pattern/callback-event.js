const EventEmitter = require('events').EventEmitter

function helloEvents() {
  const eventEmitter= new EventEmitter();
  setTimeout(() => eventEmitter.emit('hello', 'hello world'), 100);
  return eventEmitter;
}

function helloCallback(callback) {
  setTimeout(() => callback('hello world'), 100);
}

helloEvents().on('hello', console.log)
helloCallback((x) => console.log(x))

//mixed
const glob = require('glob');
glob(`${__dirname}//*.txt`, (error, files) => console.log(`All files found:${JSON.stringify(files)}`))
  .on('match', match => console.log(`Match found: ${match}`));



