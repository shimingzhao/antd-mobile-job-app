import React, { Component } from 'react'
import axios from 'axios'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

export default class Boss extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount () {
        axios.get('/user/list?type=genius')
            .then(res => {
                if (res.data.code === 0) {
                    this.setState({data: res.data.data})
                }
            })
    }

    render () {
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                <WhiteSpace/>
                {this.state.data.map(v => (
                    v.avatar ?
                        <div key={v._id}>
                            <Card>
                                <Header
                                    title={v.user}
                                    thumb={require(`../../components/img/${v.avatar}.png`)}
                                    extra={<span>{v.title}</span>}
                                />
                                <Body>{v.desc.split('\n').map((desc, index) => (
                                    <div key={index}>{desc}</div>
                                ))}</Body>
                                <WhiteSpace/>
                            </Card>
                            <WhiteSpace/>
                        </div>
                        :
                        null
                ))}
            </WingBlank>
        )
    }
}

