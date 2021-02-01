const Pool = require('pg').Pool
require('dotenv').config()


const pool = new Pool();

function doIdQuery(sql, id, lamda) {

    pool.query(sql, [id], )

};

module.exports = {
    pool, doIdQuery
}