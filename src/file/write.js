const fs = require('fs')

function write(data) {
    fs.appendFile('./output/Output.txt', '\n' + data, (err) => {

        // In case of a error throw err. 
        if (err) throw err;
    })
}

module.exports = {
    write
}