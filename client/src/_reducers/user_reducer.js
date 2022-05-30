/* eslint-disable import/no-anonymous-default-export */
// reducer는 (previousState, action Object)를 받아서 newState를 반환한다.
// 즉 action type에 따라 서로다른  newState를 반환해야한다.
import { LOGIN_USER, REGISTER_USER,AUTH_USER} from '../_action/types'


//...previousState,

export default function (previousState={}, action){
    switch (action.type){
        case LOGIN_USER:
            return {...previousState, loginSuccess :{...action.payload}}
            break;

        case REGISTER_USER:
            return {...previousState, registerSuccess:{...action.payload}}
            break;
        case AUTH_USER:
            return {...previousState, userData : action.payload}
            break;
        default:
            return previousState
    }
}