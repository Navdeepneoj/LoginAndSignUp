const express=require('express');
const bodyParser=require('body-parser');
const router=express.Router();
const {Person}=require('../model/person');
router.use(bodyParser.json());
const path=require('path');
const nodemailer=require('nodemailer');
require('dotenv').config();



router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../Frontend/index.html'));
})

router.post('/login',async(req,res)=>{
    try
    {
        const{username,password}=req.body;
        const user= await Person.findOne({username});
        if(!user){
            return res.status(404).json("Invalid username");
            
        }
        const isPassword=await user.comparePassword(password);
        if(isPassword)
        {
            res.status(200).json({Message:"Login Sucessfully"});
        }
        else
        {
            res.status(404).json("Invalid Password");
        }
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({error:"Internal server side error"});

    }
})
router.post('/signup',async(req,res)=>{
    try
    {
        const data=req.body;
        const newPerson=new Person(data);
        const response=await newPerson.save();
        res.status(200).json(response);
    } 
    catch (error)
    {
        console.log(error);
        res.status(500).json({Message:"internal server side error"});
    }

})
router.post('/reset', async (req, res) => {
    const {username, email, password } = req.body;
    try {
        const user = await Person.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid email" });
        }
        if(user.username!=username){
            return res.status(404).json({message:"invalid Username"});
        }
        user.password = password;
        await user.save();
        return res.sendFile(path.join(__dirname,'../../Frontend/index.html'));
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server side error" });
    }
});

router.post('/sendMail',async(req,res)=>{
    const {email}=req.body;
    try
    {
       const user=await Person.findOne({email}); 
       if(!user){
        return res.status(404).json({Message:"Their is no any registration with this email_ID"});
       }
       const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_EMAIL,
            pass: process.env.MAIL_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: process.env.MAIL_EMAIL, // sender address
        to: `${email}`, // list of receivers
        subject: "Reset Password Link ✔", // Subject line
        text: "Hello", // plain text body
        html: '<a href="http://localhost:3000/index1.html">Update Password</a>'
    });

    res.status(200).send('Email sent successfully');

    } 
    catch (error)
    {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
})

module.exports=router



