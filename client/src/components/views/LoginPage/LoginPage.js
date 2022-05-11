import React, { useState } from 'react';
import {Input, Button, Form} from 'antd'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {loginUser} from '../../../_action/user_action'
function LoginPage(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [Email, setEmail] = useState("")
    const [Password,setPassword] = useState("")

    const onEmailHandler = (e) =>{
        setEmail(e.target.value)
    }
    const onPasswordHandler = (e) =>{
        setPassword(e.target.value)
    }
    const onSubmitHandler = (e) =>{
        let data = {
            email:Email,
            password:Password
        }
        e.preventDefault()
        const c = dispatch(loginUser(data))
        c.payload.then(
            data =>{
                if(data.loginSuccess){
                    navigate("/")
                }else{
                    alert(data.message)
                }
            }
        )

        /*axios.post('/api/users/login',body)
        .then(response => {
            console.log(response.data.loginSuccess)
            if(response.data.loginSuccess){
                navigate("/")
            }else{
                alert('Error')
            }
        }) login test */
    }
    
    return (
        <div style={{
            display:'flex', justifyContent:'center',alignItems:'center'
            , width:'100%',height:'100vh'}}>
            <form style={{display:'flex', flexDirection:'column'}}
            onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value = {Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br/>
                <button>Submit</button>
            </form>

        </div>
    );
}

export default LoginPage;