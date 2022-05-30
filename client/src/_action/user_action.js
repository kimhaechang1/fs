import axios from "axios";
import {LOGIN_USER, REGISTER_USER, AUTH_USER} from "../_action/types"


export function loginUser(dataToSubmit){ 
    // action은 type과 payload(response)를 반환한다.
    const request = axios.post('/api/users/login',dataToSubmit)
        .then(response => 
            response.data // request = response.data
        )
    return {
        type:LOGIN_USER,
        payload:request
    } // reducer로 보낸다 
}
export function registerUser(dataToSubmit){
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(res =>
            res.data)
    return{
        type:REGISTER_USER,
        payload:request
    }
}

export function auth(){
    const request = axios.get("/api/users/auth")
        .then(res =>res.data)
    return{
        type:AUTH_USER,
        payload:request
    }
}