const {Database} = require('sqlite3')
const location = process.env.NODE_ENV === 'test' ? ':memory:' : './db.sqlite'
module.exports = new Database(location)