const transactions = require('./src')
const config = require('./config/config');
var sleep = require('system-sleep');

async function run() {
    transactions.file.del();
    transactions.db.drop.drop();
    sleep(500);
    transactions.db.save.addToDB(config.transaction1);
    sleep(500);
    transactions.db.save.addToDB(config.transaction2);
    sleep(500);
    setTimeout(function () {
        const response = transactions.db.read.readDataFromDB();
        response.then(function (result) {
            // console.log(result);
        })
    }, 500);
    sleep(500);
    setTimeout(function () {
        const response = transactions.db.readNot.readDataFromDB();
        response.then(function (result) {
            // console.log(result);
        })
    }, 500);
    sleep(500);
    setTimeout(function () {
        const response = transactions.db.min.min();
        response.then(function (result) {
            console.log(result);
        })
    }, 500);
    sleep(500);
    setTimeout(function () {
        const response = transactions.db.max.max();
        response.then(function (result) {
            console.log(result);
        })
    }, 500);
    sleep(500);

    setTimeout(function () {
        process.exit();
    }, 2000)

}
run();