import React, { Component } from 'react';
import { List, InputItem, NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', msg: [] };
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }

    // socket.on('recvmsg', data => {
    //   this.setState({ msg: [...this.state.msg, data.text] });
    // });
  }
  handleSubmit() {
    // socket.emit('sendmsg', { text: this.state.text });
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg });
    this.setState({ text: '' });
  }
  render() {
    const userid = this.props.match.params.user;
    const Item = List.Item;
    const users = this.props.chat.users;
    if (!users[userid]) {
      return null;
    }
    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack();
          }}
        >
          {users[userid].name}
        </NavBar>
        {this.props.chat.chatmsg.map((v, index) => {
          const avatar = require(`../img/${users[v.from].avatar}.png`);
          return v.from === userid ? (
            <List key={`${v._id}_${index}`}>
              <Item thumb={avatar}>{v.content}</Item>
            </List>
          ) : (
            <List key={`${v._id}_${index}`}>
              <Item extra={<img src={avatar} />} className="chat-me">
                {v.content}
              </Item>
            </List>
          );
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="Enter the message"
              value={this.state.text}
              onChange={v => this.setState({ text: v })}
              extra={<span onClick={() => this.handleSubmit()}>Send</span>}
            />
          </List>
        </div>
      </div>
    );
  }
}

export default Chat;
