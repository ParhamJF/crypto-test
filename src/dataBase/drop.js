const config = require('../../config/config');
var MongoClient = require('mongodb').MongoClient;

var url = `mongodb://${config.dbHost}/`;


async function drop() {
  MongoClient.connect(url, {
    useUnifiedTopology: true
  }).then(con => {
    const db = con.db(config.dbName);
    console.log(`Connection extablished to ${config.dbName}.`);
    db.collection(config.dbCollection).drop().then(delOK => {
      if (delOK) console.log("Collection deleted");
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      con.close();
    });
  }).catch(err => console.error(err));
}

module.exports = {
  drop
};
