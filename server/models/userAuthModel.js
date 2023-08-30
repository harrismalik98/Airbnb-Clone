const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type:String, required:true, trim: true, minlength:3, maxlength:30},
    // , unique:true ==> Add this in email 
    email: {type:String, required:true, trim:true, lowercase:true},
    password: {type:String, required:true, minlength:6}
},{
    timestamps: true // This option give us data creation and updation time.
});

const User = mongoose.model("User", UserSchema);


module.exports = {User};