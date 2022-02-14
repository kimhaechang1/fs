const {User}  = require('../models/Users')
let auth  = (req, res, next) => {
    // 인증 처리를 하는곳

    // 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    
    // 토큰을 복호화 (decode) 한 후 유저(user_id)를 찾는다.
    // 몽구스 커스텀 메서드를 만들어서 해결한다.
    User.findByToken(token, (err, user)=>{
        if(err) throw err
        if(!user) return res.json({isAuth:false, error: true})
        req.token = token // 미들웨어가 끝나고도 해당 데이터를 사용하기 위해서
        req.user = user
        next() // auth 미들웨어에서 다음으로 넘어가기 위해서
    })

    // 유저가 있으면 인증 Okay, 없으면 인증 No !
}

module.exports = {auth}