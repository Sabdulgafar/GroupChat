
const mongoose = require("mongoose");


const Users = mongoose.Schema({
    email: {type:String},
    password:{type:String,require:true},
    firstMame:{type:String},
    lastName:{type:String},
    join:  {type:Date, Default:Date.now() },
    userName:{type:String},
})
module.exports = mongoose.model('Users', Users);