/*
* The main log function
*/

const config = require('../config')

var logStartTime = process.hrtime()

function log (text, type = 'info', level = 0) {
  let message = level + '::' + type + '::'
  if (config.prod.LOG_TIME) {
    message += String(
      process.hrtime(logStartTime)[1] / 1000000
    ) + '::'
  }
  message += text

  if (level <= config.prod.LOG_LEVEL) {
    // process message here
    console.log(message)
  }
}

module.exports = log
