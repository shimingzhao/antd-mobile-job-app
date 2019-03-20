import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'
import { update } from '../../redux/user.redux'

@connect(
    state => state.user,
    {update}
)
class BossInfo extends Component {
    constructor (props) {
        super(props)
        this.state = {
            avatar: '',
            title: '',
            company: '',
            money: '',
            desc:''
        }
    }

    onChange (key, val) {
        this.setState({[key]: val})
    }

    render () {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect && redirect!==path ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar mode="dark">BOSS INFORMATION</NavBar>
                <AvatarSelector selectAvatar={imgname => this.setState({
                    avatar: imgname
                })}></AvatarSelector>
                <InputItem onChange={(v) => this.onChange('title', v)}>
                    Position
                </InputItem>
                <InputItem onChange={(v) => this.onChange('company', v)}>
                    Company
                </InputItem>
                <InputItem onChange={(v) => this.onChange('money', v)}>
                    Salary
                </InputItem>
                <TextareaItem
                    onChange={(v) => this.onChange('desc', v)}
                    rows={3}
                    autoHeight
                    title="Description"
                    labelNumber={6}
                />
                <Button onClick={() => this.props.update(this.state)} type="primary">Save</Button>
            </div>
        )
    }
}

export default BossInfo
