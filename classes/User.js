var dbTransactions = require('../dbOperations/transactions')

class User {
    constructor(userObject) {
        this.username = userObject.username
        this.email = userObject.email
        this.password = userObject.password
    }

    save(user) {
        return new Promise((resolve, reject) => {
            var sql = "INSERT INTO `users` (`name`, `email`, `password`) " +
                "VALUES ('" + user.username + "', '" + user.email + "', MD5('" + user.password + "'));"
            dbTransactions.dataOperation(sql).then((result) => {
                resolve(result);
            },(err)=>{
                reject(err)
            })
        })

    }

    update(user) {
        return new Promise((resolve, reject) => {
            var sql = "";
            if(user.username && user.password){
                sql = "UPDATE `users` SET `name`='" + user.username + "', `password`=MD5('"+user.password+"')" +
                "WHERE `email`='" + user.email + "';"
            }
            else if(user.username){
                sql = "UPDATE `users` SET `name`='" + user.username + "' " +
                "WHERE `email`='" + user.email + "';"
            }
            else if(user.password){
                sql = "UPDATE `users` SET  `password`=MD5('" + user.password + "')" +
                "WHERE `email`='" + user.email + "';"
            }
            
            dbTransactions.dataOperation(sql).then((result) => {
                resolve(result)
            },(err)=>{
                reject(err)
            })
        })

    }

    login(user) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT count(name) FROM `users` WHERE " +
                "(`email`='" + user.email + "' AND `password`=MD5('" + user.password + "'))"
            dbTransactions.dataOperation(sql).then((result) => {
                resolve(result)
            },(err)=>{
                reject(err)
            })
        })

    }
}

module.exports = User