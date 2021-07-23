var MongoClient = require('mongodb').MongoClient;
const config = require('../../config/config');
const fs = require('fs');
var i = 0
var url = `mongodb://${config.dbHost}/`;
async function addToDB(transactionFile) {
    const data = fs.readFileSync(transactionFile, 'UTF-8');
    const transaction = JSON.parse(data);
    const result = await transaction.transactions.map(async (element) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(config.dbName);
            if (element.confirmations >= 6) {
                var myObj = element;
                dbo.collection(config.dbCollection).insertOne(myObj, function (err, res) {
                    db.close();
                });
            }
        });
    })
    return true;
}
module.exports = {
    addToDB
};