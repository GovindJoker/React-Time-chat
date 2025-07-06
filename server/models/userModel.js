const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:15
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:""
    }
})

module.exports=mongoose.model('Users',userSchema)