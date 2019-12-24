
const logger = require('../index.js')
  .Logger({
    levels: {
      -1: 'fatal',
      0: 'error',
      1: 'danger',
      2: 'warning',
      3: 'info',
      4: 'success'
    }
  })
  .check((level) => level <= process.env.LOG_LEVEL)
  .do('console', (message, level) => {
    console.log(message)
  })

logger.info('logger ready')
logger.danger('logger ready')
