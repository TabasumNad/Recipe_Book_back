const express = require('express')
const UserModel =require('../models/User')
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken')


const router = express.Router()

router.post('/register', async (req,res)=>{
    const {username, password} =req.body;
    const user=   UserModel.findOne({username})
        if(user){
            return res.json({message:"user existed"})
        }
        const hashpassword =  await bcrypt.hash(password,10)

        const newuser= new UserModel({username, password: hashpassword})

        await newuser.save()
        return res.json({message:"record accept"})

})

router.post('/login', async (req,res)=>{
    const {username, password} =req.body;
    const user=  await UserModel.findOne({username})
    if(!user){
        return res.json({message:"wrong credential"})
    }
    const validPassword =await bcrypt.compare(password, user.password);
    if(!validPassword)
{
    return res.json({message:'wrong credential'})
}
const token= jwt.sign({id:user_id},"secret");

res.cookie("token",token)

return res.json({message:"successfull login", id:user_id})

})


module.exports = router