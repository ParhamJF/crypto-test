module.exports = Object.freeze({
  dbHost: process.env.DB_HOST || 'localhost:27017',
  dbName: process.env.DB_NAME || 'crypto',
  dbCollection: process.env.DB_COLLECTION || 'transactions',
  transaction1 : process.env.TRANSACTION_1 || './transactions-1.json',
  transaction2 : process.env.TRANSACTION_2 || './transactions-2.json',
  accounts : process.env.accounts || './accounts.json'
});
