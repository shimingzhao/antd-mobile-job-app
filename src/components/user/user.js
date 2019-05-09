import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutSubmit } from '../../redux/user.redux';
import browserCookie from 'browser-cookies';
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile';
import { Redirect } from 'react-router-dom';

@connect(
  state => state.user,
  {
    logoutSubmit
  }
)
class User extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout(event) {
    // event.preventDefault();
    const alert = Modal.alert;
    alert('Logout', 'Are you sure???', [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel'),
        style: 'default'
      },
      {
        text: 'OK',
        onPress: () => {
          browserCookie.erase('userid');
          this.props.logoutSubmit();
        }
      }
    ]);
  }

  render() {
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    return props.user ? (
      <div>
        <Result
          img={
            <img
              src={require(`../img/${props.avatar}.png`)}
              style={{
                width: 50
              }}
              alt=""
            />
          }
          title={props.user}
          message={props.type === 'boss' ? props.company : null}
        />{' '}
        <List renderHeader={() => 'Summary'}>
          <Item multipleLine>
            {' '}
            {props.title}{' '}
            {props.desc.split('\n').map((v, index) => (
              <Brief key={v + index}> {v} </Brief>
            ))}{' '}
            {props.money ? <Brief> Salary : {props.money} </Brief> : null}{' '}
          </Item>{' '}
        </List>{' '}
        <WhiteSpace />
        <Button
          onClick={this.logout}
          style={{
            zIndex: 99
          }}
        >
          Logout{' '}
        </Button>{' '}
      </div>
    ) : (
      <Redirect to={props.redirectTo} />
    );
  }
}

export default User;
