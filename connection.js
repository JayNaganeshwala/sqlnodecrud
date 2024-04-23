var msql = require("mysql")

let con = msql.createConnection({
    host:"localhost",user:"root",password:"",database:"college"
})

module.exports = con