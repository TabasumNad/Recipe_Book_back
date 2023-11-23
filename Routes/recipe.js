const express = require("express")
// const cors = require('cors')
const mongoose = require('mongoose')
const RecipeModel= require('../models/recipe')
// const router = require('./Routes/auth')
// const cookieParser = require('cookie-parser')
// const bcrypt=require("bcrypt")
// const jwt= require('jsonwebtoken')
// const dotenv = require('dotenv')
// dotenv.config();
const app =express()
app.use(express.json())

const router =express.Router()

router.post('/create-recipe',(req,res)=>{
    RecipeModel.create({
        name:req.body.name,
        description:req.body.description,
        ingredients:req.body.ingredients,
        imageurl:req.body.imageurl
    }).then(result=>{
        return res.json(result)
    }).catch(err=> console.log(err))
} )


module.exports = router;