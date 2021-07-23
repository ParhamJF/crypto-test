var MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const config = require('../../config/config');
const file = require('../file/write');
var lodash = require('lodash');

var url = `mongodb://${config.dbHost}/`;
const response = [];
async function min() {
    const data = fs.readFileSync(config.accounts, 'UTF-8');
    const accounts = JSON.parse(data);
    var bar = new Promise((resolve, reject) => {
        const result = accounts.accounts.map(async (element, index, array) => {
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
                    response.push(sum)

                    if (index === array.length - 1) resolve();

                })
            });
        });
    });
    return bar.then(() => {
        var min = response.reduce(function (a, b) {
            return Math.min(a, b);
        });
        var answer = `Smallest valid deposit: ${min}`;
        file.write(answer);
        return answer;
    });
}

module.exports = {
    min
};