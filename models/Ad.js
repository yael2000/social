/**
    * @description      : 
    * @author           : yaelm
    * @group            : 
    * @created          : 10/08/2021 - 22:23:51
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 10/08/2021
    * - Author          : yaelm
    * - Modification    : 
**/
const mongoose = require('mongoose')

const AdSchema = new mongoose.Schema({
    // userId: {
    //     type: String,
    //     require
    // },
    title: {
        type: String,
        max: 40
    },
    desc: {
        type: String,
        max: 500
    },
    img: {
        type: String,
    },
   
},
    { timestamps: true }
)

module.exports = mongoose.model("Ad", AdSchema)