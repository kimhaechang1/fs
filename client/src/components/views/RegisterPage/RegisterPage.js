import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_action/user_action'
import {useNavigate} from 'react-router-dom'
import auth from '../../../hoc/auth'
function RegisterPage(props) {
    const [Email,setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    const dispatch = useDispatch()
    const navigator = useNavigate()
    const onSubmitHandler = (e) =>{
        if (Password !==ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }
        e.preventDefault()

        let body = {
            email : Email,
            password : Password,
            name : Name
        }
        
        const c = dispatch(registerUser(body))
        c.payload.then(data => {
            if(data.success){
                navigator("/login")
            }else{
                alert("에러가 발생하였습니다.")
            }
        })
    }
    const onNameHandler = (e) =>{
        setName(e.target.value)
    }
    const onEmailHandler= (e) =>{
        setEmail(e.target.value)
    }

    const onPasswordHandler = (e) =>{
        setPassword(e.target.value)
    }
    const onConfirmPasswordHandler=(e)=>{
        setConfirmPassword(e.target.value)
    }
    return (
        <div style={{
            display:'flex',
            justifyContent:'center',
            alignItems : 'center',
            width: "100%",
            height:"100vh"
        }}>
            <form style={{
                display:'flex', flexDirection:'column'
            }} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value ={Email} onChange={onEmailHandler}/>
                <label>Name</label>
                <input type="text" value ={Name} onChange={onNameHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                <br/>
                <button type="submit">회원 가입</button>

            </form>

        </div>
    );
}

export default auth(RegisterPage,false);