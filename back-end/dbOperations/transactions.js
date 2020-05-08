var dbConnection = require('./dbConnect')


var dataOperation = function (sql) {
    return new Promise((resolve, reject) => {
        var db = dbConnection.connect()
        db.query(sql, (err, result) => {
            db.end()
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })
}

var transactions = {
    dataOperation: dataOperation
}

module.exports = transactions