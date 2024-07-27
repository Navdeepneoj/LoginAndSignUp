const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
require('dotenv').config();
const PersonSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        unique:true,
        require:true
    }
})

//hashed password using pre middleware
PersonSchema.pre('save',async function(next){
    const person=this;
    if(!person.isModified('password'))return next;
    try
    {
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(person.password,salt);
        person.password=hashedPassword;
        next();
    } 
    catch (error)
    {
        return next(error);
    }
})

PersonSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    } 
    catch (error)
    {
        throw error;
    }
}
const Person=mongoose.model('Person',PersonSchema);
module.exports={
    Person
}