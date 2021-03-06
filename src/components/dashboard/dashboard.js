import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMsgList, recvMsg } from '../../redux/chat.redux';
import { Route, Switch } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import NavLinkBar from '../navlink/navlink';
import Boss from '../boss/boss';
import Genius from '../genius/genius';
import User from '../user/user';
import Msg from '../msg/msg';

@connect(
  state => state,
  { getMsgList, recvMsg }
)
class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }
  render() {
    const user = this.props.user;
    const { pathname } = this.props.location;
    const navList = [
      {
        path: '/boss',
        text: 'Genius',
        icon: 'boss',
        title: 'Genius List',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'Jobs',
        icon: 'job',
        title: 'Job List',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: 'Message',
        icon: 'msg',
        title: 'Message List',
        component: Msg
      },
      {
        path: '/me',
        text: 'My Profile',
        icon: 'user',
        title: 'My Profile',
        component: User
      }
    ];

    return (
      <div>
        <NavBar className="fixed-header" mode="dark">
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList} />
      </div>
    );
  }
}

export default Dashboard;
