import React, { Component } from 'react';
import Logo from '../../components/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            type: 'genius'
        }
    }
    render(){
        const RadioItem = Radio.RadioItem
        return(
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem>Username</InputItem>
                        <InputItem>Password</InputItem>
                        <InputItem>Confirm</InputItem>
                        <RadioItem checked={this.state.type==='genius'}>
                            Genius
                        </RadioItem>
                        <RadioItem checked={this.state.type==='boss'}>
                            Boss
                        </RadioItem>
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

export default Register