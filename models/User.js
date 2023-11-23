const mangoose =require('mongoose')


const UserSchema = new mangoose.Schema({
    username:  
    {type:String, required:true ,unique:true},

    password: 
     {type:String, unique: true}
    
})

const UserModel =mangoose.model("users",UserSchema)
module.exports= UserModel;