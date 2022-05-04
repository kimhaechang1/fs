// reducer는 (previousState, action Object)를 받아서 newState를 반환한다.
import { LOGIN_USER} from '../_action/types'

export default function (previousState, action){
    switch (action.type){
        case LOGIN_USER:
            return {...previousState, loginSuccess :action.payload}
            break;
        default:
            return state
    }
}