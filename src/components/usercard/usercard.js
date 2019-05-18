import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, WhiteSpace, WingBlank, Button } from 'antd-mobile';
@withRouter
class UserCard extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  };

  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`);
  }

  render() {
    const Header = Card.Header;
    const Body = Card.Body;
    return (
      <WingBlank>
        <WhiteSpace />
        {this.props.userlist.map(v =>
          v.avatar ? (
            <div key={v._id}>
              <Card onClick={() => this.handleClick(v)} style={{ zIndex: 10 }}>
                <Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                />
                <Body>
                  {v.type === 'boss' ? <div>Company:{v.company}</div> : null}

                  {v.desc.split('\n').map((d, index) => (
                    <div key={d + index}>{d}</div>
                  ))}
                  {v.type === 'boss' ? <div>Salary:{v.money}</div> : null}
                </Body>
              </Card>
              <WhiteSpace />
            </div>
          ) : null
        )}
        <WhiteSpace />
      </WingBlank>
    );
  }
}

export default UserCard;
