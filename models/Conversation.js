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

const ConversationSchema = new mongoose.Schema({
    members: {
        type: Array,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Conversation", ConversationSchema)