const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
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

app.listen(port, ()=> console.log(`example app listening on port ${port}!`))