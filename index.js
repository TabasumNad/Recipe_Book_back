const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
// const userRouter = require('./Routes/auth')
const cookieParser = require('cookie-parser')
const bcrypt=require("bcrypt")
const jwt= require('jsonwebtoken')
const recipeRouter = require('./Routes/recipe')



// app.use(cors({
//     origin: ['http://localhost:5173'],
//     methods: ['GET',"POST"],
//     credentials:true
// }
// ))
// app.use(express.json())
// app.use(cookieParser())
// app.use('/auth',userRouter)

// mongoose.connect('mongodb://127.0.0.1:27017/recipebook')

// app.listen(4000, ()=>{
//     console.log("Server started successfully")
// })

// import * as dotenv from "dotenv";
const dotenv = require('dotenv')
dotenv.config();

// import cors from "cors";

// import express from "express";
// const app = express();
// import mongoose from 'mongoose';
// // import nodemailer from "nodemailer";
// import bodyParser from "body-parser";
// import {FormModel} from './models/Form.js'
const FormModel = require('./models/Form')

// import {router} from './Routes/register.js'


// app.use(bodyParser.json());
const app =express()
app.use(express.json())
app.use(cors({
    origin:['http://localhost:5173'],
    methods:["GET","POST"],
    credentials:true
}))
app.use(cookieParser())
app.use('/recipe',recipeRouter)


// mongoose.connect("mongodb://127.0.0.1:27017/dishes")
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected successfully!'));
// const client=mongoose.model




app.post('/register', (req,res)=>{
    const {name, email, password}= req.body;
    bcrypt.hash(password,10)
    .then( hash =>{ FormModel.create({name,email,password:hash})

    then(form=>res.json({status:"success"}))
    .catch(err=>res.json(err))
}).catch(err=>res.json(err))

   
    

})


app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    FormModel.findOne({email:email})
    .then(forms=>{
    
    if(forms){
        bcrypt.compare(password,forms.password, (err,response)=>{
            if(response){
                const token=jwt.sign({email:forms.email},
                    'jwt-secret-key', {expiresIn:'1d'} )
                    res.cookie("token",token)
                    return res.json("success")


            }else{
                return res.json("The password is incorrect")
            }
        })
    }
     else{

            res.json("No recored exist")
        }
    
    })
})







app.get("/register", async function (req, res) {
   
    const getinfo=await FormModel.find()
    console.log(getinfo)
     res.send(getinfo);
  });
  



       

const PORT = 4000;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩 Welcome To backend of recipe book Website");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
