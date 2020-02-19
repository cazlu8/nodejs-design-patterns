// common Js pattern
/*
const logger = require('./logger');
logger.info('This is an informational message');
logger.verbose('This is a verbose message');
 */

// substack pattern
/*
const logger = require('./substack-pattern');
logger('This is an informational message');
logger.verbose('This is a verbose message');
*/

//constructor pattern

const Logger = require('./constructor');
const logger = Logger ('DB');
logger.info('This is a info message');
logger.verbose('This is a verbose message');

// instance
/*
const logger = require('./instance');
const customLogger = new logger.Logger('CUSTOM');
customLogger.log('This is an informational message');
logger.log('This is an informational message');
logger.log('This is an informational message');
 */




