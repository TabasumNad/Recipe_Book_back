const mongoose = require('mongoose')


const RecipeSchema=new mongoose.Schema({
    name:String,
    description:String,
    ingredients:String,
    imageurl:String
})

 const RecipeModel = mongoose.model("recipes",RecipeSchema)
module.exports=RecipeModel