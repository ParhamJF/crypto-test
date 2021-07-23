var MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const config = require('../../config/config');
var lodash = require('lodash');
const file = require('../file/write');

var url = `mongodb://${config.dbHost}/`;
const response = [];
async function readDataFromDB() {
    const data = fs.readFileSync(config.accounts, 'UTF-8');
    const accounts = JSON.parse(data);
    const result = accounts.accounts.forEach(async (element) => {
        MongoClient.connect(url, async function (err, db) {
            var dbo = db.db(config.dbName);
            if (err) throw err;
            dbo.collection(config.dbCollection).find({
                "address": element.address
            }).toArray().then(function (dbo) {
                db.close();
                var ans = dbo.map(function (u) {
                    var result = Number.parseFloat(u.amount).toFixed(10);
                    return result
                });
                let result = ans.map(i => Number(i));
                var sum = lodash.sum(result);
                var answer = `Deposited for ${element.name}: count=${ans.length} sum=${sum}`;
                file.write(answer);
                console.log(answer);
                response.push(answer);
                // return console.log(response)

            });
        });
    });
    return response;
}
module.exports = {
    readDataFromDB
};