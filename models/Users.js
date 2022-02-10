const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
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
    password:{
        type:String,
        minlength:5
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

userSchema.pre('save', function(next){// 유저 모델을 저장하기 전에 무엇을 한다.
    // 비밀번호를 암호화 시킨다.
    var user = this // userSchema 변수를 가져옴
    
    if(user.isModified('password')){ // 비밀번호가 변경될 때만 암호화 해야한다.
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err) // 즉 save함수에 err 넘겨준다
            // 첫번째 인자 : salt함수를 거칠 값
            // 두번째 인자 : 생성한 salt
            // 세번째 인자 : 콜백
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next() // pre가 끝난후에 다음 진행을 한다(DB에 저장)
            }) 
        })
    }
}) 


const User = mongoose.model('User',userSchema)

module.exports = {User}