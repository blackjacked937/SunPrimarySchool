const mysql = require('mysql');
const {database} = require('./keys');
const pool = mysql.createPool(database);


const util = require('util');
const promisify = require('util.promisify')


pool.getConnection((error,connection) =>{
    if(error){
        if( error.code === 'PROTOCOL_CONNECTION_LOST'){

        }
        if( error.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO ANY CONNECTIONS')
        }

        if(error.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED')
        }
    }

    if (connection) connection.release();
    console.log('DB IS CONNECTED');
    return;
})

pool.query = util.promisify(pool.query);
module.exports = pool;