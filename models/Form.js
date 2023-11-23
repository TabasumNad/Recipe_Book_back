// import mongoose from 'mongoose';
const mongoose = require('mongoose')


const FormSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

 const FormModel = mongoose.model("forms",FormSchema)
module.exports=FormModel

// export {FormModel}