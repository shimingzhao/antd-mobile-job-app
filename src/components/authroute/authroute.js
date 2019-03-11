import React, { Component } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

@withRouter
class AuthRoute extends Component {
    componentDidMount () {
        const publicList = ['/loging', '/register']
        const pathname = this.props.location.pathname
        if(publicList.indexOf(pathname) > -1){
            return null
        }
        // get user information
        axios.get('/user/info').
            then(res=>{
                if(res.status === 200){
                    if(res.data.code===0){
                        // condition for login information
                    }else {
                        this.props.history.push('/login')
                    }
                    console.log(res.data)
                }
            })
        // login?
        // url = login not redirection
        // user type
        // completed the information(avator, summry)?
    }

    render () {
        return null
    }
}

export default AuthRoute
