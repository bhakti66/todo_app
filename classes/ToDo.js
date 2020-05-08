var dbTransactions = require('../dbOperations/transactions')

class ToDo{
    
    constructor(todoObject){
        this.id = todoObject.id
        this.title = todoObject.title
        this.description = todoObject.description
        this.status = todoObject.status
        this.user_email = todoObject.user_email
    }

    save(todo) {
        return new Promise((resolve, reject) => {
            var sql = "INSERT INTO `todo` (`title`, `description`, `status`, `date`,`user_id`) " +
                "VALUES ('" + todo.title + "', '" + todo.description + "', '" + todo.status + "', NOW(), "+
                "(SELECT id from `users` WHERE email='"+todo.user_email+"'));"
            dbTransactions.dataOperation(sql).then((result) => {
                resolve(result);
            },(err)=>{
                reject(err)
            })
        })

    }

    update(todo) {
        return new Promise((resolve, reject) => {
            var sql = "UPDATE `todo` SET ";
            if(todo.title){
                sql += "`title`='"+todo.title+"' ,"
            }
            if(todo.description){
                sql += " `description`='"+todo.description+"' ,"
            }
            if(todo.status){
                sql += " `status`='"+todo.status+"' ,"
            }
            sql = sql.replace(/,\s*$/, "");
            sql += " WHERE `id`="+todo.id+""
            dbTransactions.dataOperation(sql).then((result) => {
                resolve(result)
            },(err)=>{
                reject(err)
            })
        })

    }

    view(todo) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM `todo` WHERE " +
                "`user_id`=(SELECT id from `users` WHERE email='" + todo.user_email+"')"
            dbTransactions.dataOperation(sql).then((result) => {
                resolve(result)
            },(err)=>{
                reject(err)
            })
        })

    }

    delete(todo){
        return new Promise((resolve, reject) => {
            var sql = "DELETE  FROM `todo` WHERE " +
                "`id`=" + todo.id+""
            dbTransactions.dataOperation(sql).then((result) => {
                resolve(result)
            },(err)=>{
                reject(err)
            })
        })
    }
   
}

module.exports = ToDo