import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import { login } from '../service';
import Home from './home';
import Login from './login';
import Signup from './signup';
import Welcome from './welcome';


export default function Router1(props) {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');


    return (
        <Router>
            <Switch>

                <Route path='/signup'>
                    <Signup />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/home/:email'>
                    <Home />
                </Route>

                <Route path='/'>
                    <Welcome />
                </Route>
            </Switch>
        </Router>
    )
}

export function Menu(props) {
    const { user, password } = props;
    useEffect(function () {
    }, [user, password])

    return (
        <nav>
            <Link to='/' style={{ marginRight: "10px" }, { color: 'green' }}>Login</Link>
            <Link to='/home/sara/1234' style={{ marginRight: "10px" }, { color: 'green' }}>Home</Link>
            <Link to='/about' style={{ marginRight: "10px" }}>about</Link>
            <Link to='/prices' style={{ marginRight: "10px" }, { color: 'red' }}>prices</Link>
        </nav>
    )
}