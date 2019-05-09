import React, { Component } from 'react';
import io from 'socket.io-client';
import { List, InputItem } from 'antd-mobile';
const socket = io('ws://localhost:9093');
socket.on('recvmsg', function(data) {
  console.log(data);
});

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  componentDidMount() {}
  handleSubmit() {
    socket.emit('sendmsg', { text: this.state.text });
    this.setState({ text: '' });
  }
  render() {
    return (
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
    );
  }
}

export default Chat;
