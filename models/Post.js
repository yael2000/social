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

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        require
    },
    desc: {
        type: String,
        max: 500
    },
    img: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    },
},
    { timestamps: true }
)

module.exports = mongoose.model("Post", PostSchema)