const mysql = require('mysql');


var connect = function(){
    return mysql.createConnection({
        host: 'localhost',
        port:8889,
        user: 'root',
        password: 'root',
        database: 'db_node_crud'
      });

    // return con
    // con.connect((err) => {
    // if(err){
    //     console.log('Error connecting to Db ',err);
    //     return;
    // }
    // console.log('Connection established');
    // });
    
    // con.end((err) => {
    // // The connection is terminated gracefully
    // // Ensures all remaining queries are executed
    // // Then sends a quit packet to the MySQL server.
    // });
}

var database = {
    connect : connect
};


module.exports = database;