
const pool = require("../config/connection")

async function getTests(){
    try{
        console.log("Veritabanı test bağlantısı başarılı");
        const result = await pool.query("SELECT * FROM test_employees");
        return result.rows
    }catch(err){
        return "test veritabanına bağlanırken sorun oluştu: " + err;
    }
}

module.exports = { getTests }