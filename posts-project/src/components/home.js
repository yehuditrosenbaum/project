import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect,
    withRouter
} from "react-router-dom";
import ShowAllPosts from './showAllPosts';
import ShowMyPosts from './showMyPosts';
import History from './history';
import logoP from '../Postit_logo.png'


export default withRouter(function Home(props) {
    const { email } = useParams()
    const { history } = props;

    useEffect(() => {
        // history.push('/hello')
        // return <Redirect to={'/home/hello'}></Redirect>
    }, [])

    return (
        <Router>
            <Menu email={email} />
            <Switch>
                {/* <Route path='/home/hello'>
                    <Hello />
                </Route> */}
                <Route path='/home/allPosts/:email'>
                    <ShowAllPosts />
                </Route>
                <Route path='/home/myPosts/:email'>
                    <ShowMyPosts />
                </Route>
                <Route path='/home/history/:email'>
                    <History />
                </Route>
            </Switch>
        </Router>
    )
});
export function Menu(props) {
    const { email } = props;
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixedNav">
             
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item" >
                            <Link to={`/home/allPosts/${email}`} className="nav-link" style={{ fontSize: '20px' }}>all posts</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/home/myPosts/${email}`} className="nav-link" style={{ fontSize: '20px' }}>my posts</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/home/history/${email}`} className="nav-link" style={{ fontSize: '20px' }}>history</Link>
                        </li>
                    </ul>
                    <span className="navbar-text" style={{ display: 'block ruby' }}>
                        <img src={logoP} />
                    </span>
                </div>
            </nav>
            <div className='mb-5'></div>
        </>
    )
}
