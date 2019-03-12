import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'

class BossInfo extends Component {
    constructor (props) {
        super(props)
        this.state = {
            title: ''
        }
    }

    onChange (key, val) {
        this.setState({[key]: val})
    }

    render () {
        return (
            <div>
                <NavBar mode="dark">BOSS INFORMATION</NavBar>
                <AvatarSelector selectAvatar={imgname=>this.setState({
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
                <Button type="primary">Save</Button>
            </div>
        )
    }
}

export default BossInfo
