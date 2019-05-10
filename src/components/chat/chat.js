import React, { Component } from 'react';
import { List, InputItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList } from '../../redux/chat.redux';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

@connect(
  state => state,
  { getMsgList }
)
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', msg: [] };
  }
  componentDidMount() {
    this.props.getMsgList();
    // socket.on('recvmsg', data => {
    //   this.setState({ msg: [...this.state.msg, data.text] });
    // });
  }
  handleSubmit() {
    // socket.emit('sendmsg', { text: this.state.text });
    this.setState({ text: '' });
  }
  render() {
    return (
      <div>
        {this.state.msg.map(v => {
          return <p key={v}>{v}</p>;
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
