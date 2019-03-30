import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile/lib/index'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect (
    state => state.chatuser, {getUserList}
)
class Boss extends Component {
    componentDidMount () {
        this.props.getUserList('genius')
    }

    render () {
        return <UserCard userlist={this.props.userlist}></UserCard>
    }
}

export default Boss

