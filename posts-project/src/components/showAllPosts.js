import React, { useState, useEffect, useRef } from 'react';
import { watchPost } from '../service';
import { actions } from './store/actions';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';


function mapStateToProps(state) {
    return { MyPosts: state.postsReducer.posts }
}


const mapDispatchToProps = (dispatch) => ({
    watchPostR: (post) => dispatch(actions.watchPost(post)),
    // addMyPost: (posts) => dispatch(actions.addPost(posts))
})

export default connect(mapStateToProps, mapDispatchToProps)(function ShowAllPosts(props) {
    const [showBody, setShowBody] = useState(-1);
    const { watchPostR } = props;
    const { email } = useParams()
    const [postsList, setPostsList] = useState(null);

    useEffect(async () => {

        await fetch('https://jsonplaceholder.typicode.com/posts').then(data => {
            data.json().then(data => {
                if (data)
                    setPostsList(postsList => data)
                console.log(data)
            })

        }).catch(err => { console.log(err) })
    }, [])
    const { } = props;
    function watch(post) {
        setShowBody(post.id)
        console.log(post)
        watchPost(post).then(data => {
            watchPostR(data.post)
        }, err => {
            alert("faled to add the post")

        })
    }

    return (
        <>
            <h1 style={{ textAlign: 'center', marginBottom: '5%' }}>All Posts</h1>
            { postsList ?
                // <table className="table">
                <div>
                    {postsList.map(item => (
                        <div key={item.id} className="row d-flex justify-content-center">
                            <div className="col-6 post-div" >
                                <div><h5>{item.title}</h5></div>
                                {/* <br /> */}
                                {showBody != item.id ?
                                    <button onClick={() => { watch(item) }} className="button" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                        </svg>
                                    </button>
                                    : ''}
                                {showBody == item.id ?
                                    <>
                                        <div>{item.body}</div>
                                        <br />
                                        <button onClick={() => { setShowBody(-1) }} className='button'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                                            </svg>
                                        </button>
                                    </>
                                    : ''}
                                <br />
                                {/* <div><button id={item.id} onClick={() => { watch(item) }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z" />
                                </svg></button></div> */}
                                <br />

                            </div>
                        </div>
                    ))}
                    {/* </table> */}
                </div>
                : ''}
        </>
    )
})