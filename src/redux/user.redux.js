import axios from 'axios'
import {getRedirectPath} from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
    redirectTo: '',
    isAuth: false,
    user: '',
    pwd: '',
    type: '',
    msg: ''
}

// user reducer
export function user (state=initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                msg: '',
                redirectTo: getRedirectPath(action.payload),
                ...action.payload
            }
        case ERROR_MSG:
            return {...state, msg: action.msg, isAuth: false}
        default:
            return state
    }
}

function registerSuccess(data){
    return {type: REGISTER_SUCCESS, payload: data}
}

function errorMsg(msg){
    return {msg, type: ERROR_MSG}
}

export function register ({user, pwd, repeatpwd, type}) {
    if(!user||!pwd||!repeatpwd||!type){
        return errorMsg('Missing username, password or type')
    }
    if(pwd!==repeatpwd){
        return errorMsg('Password and repeat password not matched')
    }

    return dispatch=>{
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    dispatch(registerSuccess({user, pwd, type}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}
