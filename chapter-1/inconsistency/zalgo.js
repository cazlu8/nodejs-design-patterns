const fs = require('fs');
const cache = {};
function inconsistentRead(filename, callback) {
  if(cache[filename]) {
    //invoked synchronously
    callback(cache[filename]);
  } else {
    //asynchronous function
    fs.readFile(filename, 'utf8', (err, data) => {
      cache[filename] = data;
      callback(data);
    });
  }
}

function createFileReader(filename) {
  const listeners = [];
  inconsistentRead(filename, value => {
    listeners.forEach(listener => listener(value));
  });
  
  return {
    onDataReady: listener => listeners.push(listener)
  };
}


const reader1 = createFileReader('chapter-1/data.txt');
reader1.onDataReady(data => {
  console.log('First call data: ' + data);
  
  const reader2 = createFileReader('chapter-1/data.txt');
  reader2.onDataReady( data => {
    console.log('Second call data: ' + data);
  });
});


function consistentReadSync(filename, cb) {
  if(cache[filename]) {
    process.nextTick(() => cb(cache[filename]))
  } else {
    cache[filename] = fs.readFileSync(filename, 'utf8');
    cb(cache[filename]);
  }
}

let file = consistentReadSync(`chapter-1/data.txt`, console.log)
file = consistentReadSync(`chapter-1/data.txt`, console.log)


