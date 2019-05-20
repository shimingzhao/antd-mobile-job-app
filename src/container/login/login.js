import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import Logo from '../../components/logo/logo';
import { login } from '../../redux/user.redux';
import imoocForm from '../../components/imooc-form/imooc-form';

// function WrapperHello(Comp) {
//   class WrapComp extends Component {
//     render() {
//       return (
//         <div>
//           <p>this is HOC</p>
//           <Comp {...this.props} />
//         </div>
//       );
//     }
//   }
//   return WrapComp;
// }
// @WrapperHello
// class Hello extends Component {
//   render() {
//     return <h2>hello imooc, I love React</h2>;
//   }
// }

@connect(
  state => state.user,
  { login }
)
@imoocForm
class Login extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  register() {
    this.props.history.push('./register');
  }

  handleLogin() {
    this.props.login(this.props.state);
  }

  render() {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <Logo />
        <WingBlank>
          <List>
            {this.props.msg ? (
              <p className="error-msg"> {this.props.msg} </p>
            ) : null}
            <InputItem onChange={v => this.props.handleChange('user', v)}>
              Username
            </InputItem>
            <InputItem
              type="password"
              onChange={v => this.props.handleChange('pwd', v)}
            >
              Password
            </InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleLogin} type="primary">
            Login
          </Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">
            Register
          </Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
