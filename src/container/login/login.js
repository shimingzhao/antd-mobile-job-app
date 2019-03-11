import React, { Component } from 'react'
import {
    List, InputItem, WingBlank, WhiteSpace, Button
} from 'antd-mobile'
import Logo from '../../components/logo/logo'

class Login extends Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
    }

    register() {
        this.props.history.push('./register')
    }

    render() {
        return (
            <div>
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem>Username</InputItem>
                        <InputItem>Password</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary">Login</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type="primary">Register</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login
