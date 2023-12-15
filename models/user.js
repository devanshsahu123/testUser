const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    fName:{
    type:String,
    require:true
    },
    lName: {
        type: String,
        require: true
    }, 
    email: {
        type: String,
        require: true
    }, 
    password: {
        type: String,
        require: true
    },
})

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;