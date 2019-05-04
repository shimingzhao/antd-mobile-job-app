import React from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank, Button } from 'antd-mobile'

class UserCard extends React.Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }
    render () {
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v => (
                    v.avatar ? (
                        <div key={v._id}>
                            <Card>
                                <Header
                                    title={v.user}
                                    thumb={require(`../img/${v.avatar}.png`)}
                                    extra={<span>{v.title}</span>}
                                ></Header>
                                <Body>
                                    {v.type === 'boss' ? <div>Company:{v.company}</div> : null}

                                    {v.desc.split('\n').map((d, index) => (
                                        <div key={d+index}>{d}</div>
                                    ))}
                                    {v.type === 'boss' ? <div>Salary:{v.money}</div> : null}
                                </Body>
                            </Card>
                            <WhiteSpace></WhiteSpace>
                        </div>
                    ) : null

                ))}
                <WhiteSpace></WhiteSpace>
            </WingBlank>
        )

    }
}

export default UserCard

