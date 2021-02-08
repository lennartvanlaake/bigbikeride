const Pool = require('pg').Pool
require('dotenv').config()


const pool = new Pool();

function safeQuery(res, sql, params, lamda) {
    pool.query(sql, params, (error, results) =>  {
        if (error) {
            console.log(error);
            return res.status(400).json({ "exception": error });
        }
        return lamda(results);
    })
};

module.exports = {
    safeQuery
}