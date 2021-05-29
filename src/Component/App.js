import React, { Component } from 'react'
import './App.css'
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import { AuthProvider } from '../Contexts/AuthContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

class App extends Component {
    render() {
        return (
            <>
            <Router>
                <AuthProvider>
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <PrivateRoute path="/update-profile" component={UpdateProfile} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Login} />
                        <Route path="/forgot-password" component={ForgotPassword} />
                    </Switch>
                </AuthProvider>
            </Router>
            </>
        )
    }
}

export default App;
