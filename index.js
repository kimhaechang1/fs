const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require('./models/Users') // 모델 불러오기
const mongoose = require('mongoose')
const config = require('./config/key')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))
//application/json
app.use(bodyParser.json())
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> console.log('mongoDB Connected'))
.catch(err => console.log(err))

app.get('/',(req,res) => res.send('hello world'))

app.post('/register',(req,res)=>{
    // 회원가입 할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.
    const user = new User(req.body) // mongoDB의 모델중 User라는 이름의 모델을 들고와서 인스턴스화 시키고
    // 생성자로 client의 정보를 bodyparser을 통해 받아온것을 넘긴다. 
    user.save((err,doc)=>{
        if(err)  return res.json({success:false, err}) // json폼으로 실패했다는것을 알리고 err메시지를 알린다.
        return res.status(200).json({
            success:true
        })
    }) // status 200 : 성공
})
app.post('/login', (req,res)=>{
    User.findOne({ email: req.body.email}, (err, user)=>{ // DB에서 데이터 하나 찾기
        if(!user){
            return res.json({
                loginSuccess:false,
                message:"제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        user.comparePassword(req.body.password , (err,isMatch)=>{// DB에서 이메일 비교가 성공한 후 패스워드 비교
            // 이 메소드는 기본적으로 몽고DB 스키마에서 제공하는 메소드가 아닌 커스텀 메소드기때문에
            // userSchema.methods.comparePassword로 만들어줘야한다.
            if(!isMatch)
                return res.json({
                    loginSuccess:false,
                    message:"비밀번호가 틀렸습니다."
                })
            user.genToken((err,user)=>{ // 비밀번호가 만드는 것에 성공하였다면 토큰을 생성하는 커스텀함수
                if(err) return res.status(400).send(err)
                // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 등등
                // 쿠키에 저장하기위해 cookie-parser 을 다운받는다
                res.cookie("x_auth", user.token) // 쿠키에 x_auth 항목에 user.token이 들어간다.
                .status(200) // 성공
                .json({ loginSuccess:true, userId:user._id })
            })
        }) 
    }) 
})
app.listen(port, ()=> console.log(`example app listening on port ${port}!`))