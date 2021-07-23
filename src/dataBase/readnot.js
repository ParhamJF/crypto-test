var MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const config = require('../../config/config');
const file = require('../file/write');
var lodash = require('lodash');

var url = `mongodb://${config.dbHost}/`;
const response = [];
const address = [];
async function readDataFromDB() {
    const data = fs.readFileSync(config.accounts, 'UTF-8');
    const accounts = JSON.parse(data);
    var bar = new Promise((resolve, reject) => {
        accounts.accounts.map(async (element) => {
            address.push(element.address);
        })
        MongoClient.connect(url, async function (err, db) {
            var dbo = db.db(config.dbName);
            if (err) throw err;
            dbo.collection(config.dbCollection).find({
                "address": {
                    $nin: address
                }
            }).toArray().then(function (dbo) {
                db.close();
                var ans = dbo.map(function (u) {
                    var result = Number.parseFloat(u.amount).toFixed(10);
                    return result
                });
                let result = ans.map(i => Number(i));
                var sum = lodash.sum(result);
                var answer = `Deposited for without reference: count=${ans.length} sum=${sum}`;
                file.write(answer);
                console.log(answer);
                response.push(answer);
                resolve();
            });
        });
    });
    return bar.then(() => {
        return response;
    });
}
module.exports = {
    readDataFromDB
};