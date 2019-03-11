import React, { Component } from 'react'
import {connect} from 'react-redux'
import {
    List, InputItem, WingBlank, WhiteSpace, Button, Radio
} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import {register} from '../../redux/user.redux'

@connect(
    state => state.user,
    {register}
)
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        }
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleChange(key, val){
        this.setState({
            [key]: val
        })
    }

    handleRegister(){
        this.props.register(this.state)
    }

    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem onChange={v => this.handleChange('user', v)}>
                            Username
                        </InputItem>
                        <InputItem onChange={v => this.handleChange('pwd', v)} type="password">
                            Password
                        </InputItem>
                        <InputItem onChange={v => this.handleChange('repeatpwd', v)} type="password">
                            Confirm
                        </InputItem>
                        <RadioItem
                            checked={this.state.type === 'genius'}
                            onChange={()=>this.handleChange('type', 'genius')}
                        >
                            Genius
                        </RadioItem>
                        <RadioItem
                            checked={this.state.type === 'boss'}
                            onChange={()=>this.handleChange('type', 'boss')}
                        >
                            Boss
                        </RadioItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleRegister}>Register</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register
