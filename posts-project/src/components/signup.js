import React, { useState, useEffect, useRef } from 'react';
import { signup } from '../service';
import fire from '../fire'
import { withRouter } from 'react-router-dom';
import logoP from '../Postit_logo.png'

export default withRouter(function Signup(props) {

    const { history } = props;
    const emailRef = useRef('');
    const passwordRef = useRef('');

    function sendDetails() {
        if (emailRef.current.value != '' && passwordRef.current.value != '') {
            signup({ 'email': emailRef.current.value, 'password': passwordRef.current.value }).then(
                data => {
                    history.push('/login')
                },
                err => {
                    alert('failed to create user');
                }
            )
        }
        else
            console.log('nulllllllllllllllllll');

    }




    // useEffect(() => {
    //     const signupform = document.getElementById('signupform')
    //     signupform.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         const email = document.getElementById('email')
    //         const password = document.getElementById('password')
    //     })

    // }, [])

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
            <div className='container'>
                <div className='col-4'></div>
                <div className='col'>

                    <h1 className='mb-5 mt-5' style={{ textAlign: 'center' }}>Create Account</h1>
                    <div className="form-group">
                        <label className="ml-5" htmlFor="email">Email address</label>
                        <input className="form-control ml-5" style={{ width: '250px' }} id="email" type="email" ref={emailRef} aria-describedby="emailHelp" placeholder="Enter email"></input>
                        <small id="emailHelp" className="form-text text-muted ml-5">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label className='ml-5' htmlFor="password">Password</label>
                        <input className="form-control ml-5" style={{ width: '250px' }} id="password" type="password" ref={passwordRef} placeholder="Password"></input>
                    </div>
                    <br />
                    <button onClick={sendDetails} className="btn btn-light ml-5" style={{ backgroundColor: 'rgb(222, 243, 243)' }}>signup</button>
                </div>
            </div>
        </>
    )
});