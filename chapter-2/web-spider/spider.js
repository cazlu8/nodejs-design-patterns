const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const util = require('../../util');
const pathToSave = (filename) => `${__dirname}//${filename}`

function spider (url , callback) {
  const filename = util.urlToFilename(url)
  fs.exists(pathToSave(filename), exists => {                    //[1]
    if (exists) {
      return callback(null, filename, false);
    } else {
      download(url, filename, err => {
        if(err) {
          return callback(err);
        }
        callback(null, filename, true);
      })
    }
  })
}

function download (url, filename, callback) {
  request(url , (err , response , body) => {        //[2]
    if (err) {
      return callback(err)
    }
    saveFile(filename , body , err => {
      if (err) {
        return callback(err)
      }
      console.log(`Downloaded and saved: ${url}`)
      callback(null , filename)
    })
  })
}

function saveFile(filename, contents, callback) {
  mkdirp(path.dirname(filename), err => {
    if(err) {
      return callback(err);
    }
    fs.writeFile(pathToSave(filename), contents, callback);
  });
}

spider(process.argv[2], (err, filename, downloaded) => {
  if(err) {
    console.log(err)
  } else if(downloaded){
    console.log(`Completed the download of "${filename}"`)
  } else {
    console.log(`"${filename}" was already downloaded`)
  }
});


