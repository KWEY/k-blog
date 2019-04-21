const schedule = require('node-schedule')
const { clear } = require('./controllers/statistical')
const scheduleCronstyle = () => {
  schedule.scheduleJob('0 0 0 * * *', function() {
    console.log(new Date(), '-------0 0 12 * * *-----')
    clear()
  })
}

module.exports = scheduleCronstyle
