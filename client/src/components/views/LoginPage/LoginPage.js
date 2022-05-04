import React, { useState } from 'react';
import {Input, Button, Form} from 'antd'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_action/user_action'
function LoginPage(props) {
    const dispatch = useDispatch()

    const [Email, setEmail] = useState("")
    const [Password,setPassword] = useState("")

    const onEmailHandler = (e) =>{
        setEmail(e.target.value)
    }
    const onPasswordHandler = (e) =>{
        setPassword(e.target.value)
    }
    const onSubmitHandler = (e) =>{
        e.preventDefault()
        
        let body={
            email:Email,
            password:Password
        }
        dispatch(loginUser(body))
        

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