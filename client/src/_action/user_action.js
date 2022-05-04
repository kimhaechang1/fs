import axios from "axios";
import { response } from "express";
import {LOGIN_USER} from "../_action/types"

export function loginUser(dataToSubmit){ 
    // action은 type과 payload(response)를 반환한다.

    const request = axios.post('/api/users/login',dataToSubmit)
        .then(res => 
            response.data // request = response.data
        )
    return {
        type:LOGIN_USER,
        payload:request
    } // reducer로 보낸다 
}