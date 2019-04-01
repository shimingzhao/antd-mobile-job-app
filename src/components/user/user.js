import React, { Component } from 'react'
import { connect } from 'react-redux'
import browserCookie from 'browser-cookies'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'

@connect(
    state => state.user
)
class User extends Component {
	constructor(props){
		super(props)
		this.logout = this.logout.bind(this)
	}
    logout(){
        const alert = Modal.alert
        alert('Logout', 'Are you sure???', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
            { text: 'OK', onPress: () => {
                browserCookie.erase('userid')
                window.location.herf = window.location.href
            }}
          ])       
    }
    render() {
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        return props.user ? (
            <div>
                <Result 
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt=""/>}
                    title={props.user}
                    message={props.type === 'boss' ? props.company : null}
                />
                <List renderHeader={()=>'Summary'}>
                    <Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map(v=> <Brief key={v}>{v}</Brief>)}
                        {props.money ? <Brief>Salary: {props.money}</Brief> : null}             
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
				<Button onClick={this.logout}>Logout</Button>
            </div>
        ) : null
    }
}

export default User
