import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect,
    withRouter
} from "react-router-dom";
import Login from './login';
import Signup from './signup';
import '../App.css';
import logoP from '../Postit_logo.png'


export default withRouter(function Welcome(props) {
    const { history } = props
    function login() {
        history.push('/login');
    }
    function signup() {
        history.push('/signup');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixedNav">
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item" >
                        </li>
                        <li className="nav-item">
                        </li>
                        <li className="nav-item">
                        </li>
                    </ul>
                    <span className="navbar-text" style={{ display: 'block ruby', textAlign: 'end' }}>
                        <img src={logoP} />
                    </span>
                </div>
            </nav>
            <div className='container' >
                <div className='row p-5'>
                    <div className='col' style={{ textAlign: 'center' }}>
                        <div><h1>Welcome to Our Site!</h1></div>
                        <br />
                        <br />
                    </div>
                </div>
                <div className='row pt-5'>
                    <div className='col d-flex justify-content-center'>
                        <button className='btn btn-light btn-lg' style={{ backgroundColor: 'rgb(222, 243, 243)' }} onClick={login} >login</button>
                    </div>
                    <div className='col d-flex justify-content-center'>
                        <button className='btn btn-light btn-lg' style={{ backgroundColor: 'rgb(222, 243, 243)' }} onClick={signup} >signup</button>
                    </div>
                </div>
            </div>
        </>
    )
});

