const fs = require('fs');
function readJSON(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    let parsed;
    if(err)
    //propagate the error and exit the current function
      return callback(err);
    
    try {
      //parse the file contents
      parsed = JSON.parse(data);
    } catch(err) {
      //catch parsing errors
      return callback(err);
    }
    //no errors, propagate just the data
    callback(null, parsed);
  });
};

function readJSONThrows(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if(err) {
      return callback(err);
    }
    //no errors, propagate just the data
    callback(null, JSON.parse(data));
  });
};

readJSON('chapter-1/data.txt', err => console.log(err));

//the catch never will get the error cause the code is async
try {
  readJSONThrows('nonJSON.txt', function(err, result) {
    //...
  });
} catch(err) {
  console.log('This will not catch the JSON parsing exception');
}

process.on('uncaughtException', (err) => {
  console.error('This will catch at last the ' +
    'JSON parsing exception: ' + err.message);
  // Terminates the application with 1 (error) as exit code:
  // without the following line, the application would continue
  process.exit(1);
});
