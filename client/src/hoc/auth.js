import { axios } from 'axios'
import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {auth} from '../_action/user_action'
import {useNavigate} from 'react-router-dom'
// eslint-disable-next-line import/no-anonymous-default-export
export default function(SpecificComponent, option, adminRoute = null){

    // option = null : 아무나 출입이 가능한 페이지
    // option = true : 로그인한 유저만 출입이 가능한 페이지
    // option = false : 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props){
        const navigate =useNavigate()
        const dispatch = useDispatch()
        useEffect(()=>{
           dispatch(auth()).payload.then(res =>{
                console.log(res)
                if (!res.isAuth){
                    if(option){
                        // 로그인을 하지 않았는데도 불구하고 로그인 한 페이지에 접속한다면
                        navigate("/login")
                    }
                }else{
                    if(adminRoute && !res.isAdmin){
                        // 로그인을 한 유저-> 검사 해보니 어드민이 아닌데도 어드민페이지에 접속한다면
                        navigate("/")
                    }else{
                        if(!option){
                            // 로그인 한 유저인데 로그인한 유저는 출입 안되는 페이지에 접속하려 한다면
                            navigate("/")
                        }
                    }
                }
            })
        },[])
        return (
            <SpecificComponent/>
        )
    }

    return AuthenticationCheck
}