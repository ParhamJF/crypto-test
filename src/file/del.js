const fs = require('fs')

const path = './output/Output.txt'

function del() {
  try {
    fs.unlinkSync(path)
    // file removed
  } catch (err) {
    console.error(err)
  }
}
module.exports = {
  del
}