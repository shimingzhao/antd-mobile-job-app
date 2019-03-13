import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {
    BrowserRouter, Route, Redirect, Switch
} from 'react-router-dom'

import reducers from './reducer'
import './config'
import './index.css'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './components/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__() ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
))

const Boss = () => <h2>Boss page</h2>


ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute />
                <Route path='/bossinfo' component={BossInfo}/>
                <Route path='/geniusinfo' component={GeniusInfo}/>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </div>
        </BrowserRouter>
    </Provider>), document.getElementById('root'))
