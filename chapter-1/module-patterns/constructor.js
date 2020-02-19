function Logger(name) {
  if(!new.target) {
    return new Logger(name);
  }
  this.name = name;
}

Logger.prototype.log = function(message, type) {
  console[type](`[${this.name}] ${message}`);
};

Logger.prototype.info = function(message) {
  this.log(`info: ${message}`, 'info');
};

Logger.prototype.verbose = function(message) {
  this.log(`verbose: ${message}`, 'warn');
};

module.exports = Logger;

//es6
/*
class Logger {
  constructor(name) {
    this.name = name;
  }
  
  log(message) {
    console.log(`[${this.name}] ${message}`);
  }
  
  info(message) {
    this.log(`info: ${message}`);
  }
  
  verbose(message) {
    this.log(`verbose: ${message}`);
  }
}

module.exports = Logger;
 */
