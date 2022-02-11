const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
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
    }else{
        next() // 비밀번호가 변경 안되도 next를 통해 다음 과정이 진행되어야 한다.
    }
}) 

userSchema.methods.comparePassword = function(plainPassword, cb){ 
    // plainPassword : 암호화 되기 전 비밀번호
    // 즉 plainPassword를 암호화 하여 암호화된 비밀번호가 있는 DB값과 비교하여야 한다.
    // cb는 콜백함수로 아까전 index.js에서 해당 함수의 정의 상으로 인자가 (err, isMatch)이다.
    bcrypt.compare(plainPassword, this.password, function(err,isMatch){
        if(err) return cb(err) // 일치하는게 없다면 콜백함수에 err넘겨줌
        cb(null, isMatch) // 일치하는게 있다면 err부분에 null, isMatch = true 로 들어간다.
    })
}
userSchema.methods.genToken = function(cb){
    // jsonwebtoken을 시용해서 token 을 생성한다.
    var user = this
    var token = jwt.sign(user._id.toHexString(), 'testToken1') // mongoDB상에 ObjectID로 되어있는 _id값을 들고옴
    // user._id와 'testToken1'을 합쳐서 토큰을 만드는데
    // 나중에 토큰을 해석하는곳에 토큰을 사용하면 user._id가 나온다.
    //  따라서 token을 따로 변수에 저장해야한다.
    user.token = token
    user.save(function(err, user){ // DB의 스키마에 token 필드에 저장
        if(err) return cb(err)
        cb(null, user) // 여기서 user는 inserted된 정보가 포함되어있다.
    })  
}
const User = mongoose.model('User',userSchema)

module.exports = {User}