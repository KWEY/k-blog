const mongoose = require('mongoose')
const Counter = mongoose.model('Counter')

const getNextSequenceValue = () => {
  return new Promise((resolve, reject) => {
    Counter.findOneAndUpdate(
      { id: 'productid' },
      {
        $inc: { sequence_value: 1 }
      },
      { new: true },
      function(err, data) {
        if (err) {
          reject(err)
        }
        resolve(data)
      }
    ).exec()
  })
}

module.exports = {
  getNextSequenceValue
}
