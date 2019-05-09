import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio
} from 'antd-mobile';
import Logo from '../../components/logo/logo';
import { register } from '../../redux/user.redux';
import imoocForm from '../../components/imooc-form/imooc-form';

@connect(
  state => state.user,
  { register }
)
@imoocForm
class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    this.props.handleChange('type', 'genius');
  }

  handleRegister() {
    this.props.register(this.props.state);
  }

  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <List>
            {this.props.msg ? (
              <p className="error-msg">{this.props.msg}</p>
            ) : null}
            <InputItem onChange={v => this.props.handleChange('user', v)}>
              Username
            </InputItem>
            <InputItem
              onChange={v => this.props.handleChange('pwd', v)}
              type="password"
            >
              Password
            </InputItem>
            <InputItem
              onChange={v => this.props.handleChange('repeatpwd', v)}
              type="password"
            >
              Confirm
            </InputItem>
            <RadioItem
              checked={this.props.state.type === 'genius'}
              onChange={() => this.props.handleChange('type', 'genius')}
            >
              Genius
            </RadioItem>
            <RadioItem
              checked={this.props.state.type === 'boss'}
              onChange={() => this.props.handleChange('type', 'boss')}
            >
              Boss
            </RadioItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>
            Register
          </Button>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
