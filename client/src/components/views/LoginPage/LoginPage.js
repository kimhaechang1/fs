import React, { useState } from 'react';
import {Input, Button, Form} from 'antd'
function LoginPage(props) {
    const [Email,setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (e) =>{
        setEmail(e.target.value)
    }
    const onPasswordHandler = (e) =>{
        setPassword(e.target.value)
    }
    const onSubmitHandler = (e) =>{
        e.preventDefault()

        console.log("email",Email)
        console.log("Password",Password)
    }

    return (
        <div style={{
            display:'flex', justifyContent:'center',alignItems:'center'
            , width:'100%',height:'100vh'}}>
            <form style={{display:'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br/>
                <button>
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;