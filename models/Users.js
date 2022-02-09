const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true, // 공백제거 true
        unique: 1 // 중복 불허
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{ // 관리자 1, 일반 사용자 0
        type:Number, 
        default:0
    },
    image: String,
    token:{ // 유효성 검사
        type:String
    },
    tokenExp:{ // 유효기간
        type:Number
    }
})

const User = mongoose.model('User',userSchema)

module.exports = {User}