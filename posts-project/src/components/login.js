import React, { useState, useRef, Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { login } from '../service';
import fire from '../fire';
import logoP from '../Postit_logo.png'
export default withRouter(function Login(props) {

    const emailRef = useRef('');
    const passwordRef = useRef('');
    const { history } = props;


    function sendDetails() {
        if (emailRef.current.value != '' && passwordRef.current.value != '') {
            login(emailRef.current.value, passwordRef.current.value).then(data => {
                if (!data) {
                    alert("user not found!!!")
                    return;
                }
                history.push(`/home/${emailRef.current.value}`);
                // return <Redirect to={`/home/${emailRef.current.value}`} />
            }, err => {
                alert("user not found!!!")
                return;
            })
        }
        else
            console.log('nulllllllllllllllllll');
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
            <div className='container'>
                <div className='col-4'></div>
                <div className='col'>
                    <h1 className='mb-5 mt-5' style={{ textAlign: 'center' }}>Login</h1>
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
                    <button onClick={sendDetails} className="btn btn-light ml-5" style={{ backgroundColor: 'rgb(222, 243, 243)' }}>login</button>
                </div>
            </div>
        </>
    )
})