import React, { Component } from 'react'
import axios from 'axios'

class AuthRoute extends Component {
    componentDidMount () {
        // get user information
        axios.get('/user/info').
            then(res=>{
                if(res.status === 200){
                    console.log(res.data)
                }
        })
        // login?
        // url = login not redirection
        // user type
        // completed the information(avator, summry)?
    }

    render () {
        return (
            <h2></h2>
        )
    }
}

export default AuthRoute
