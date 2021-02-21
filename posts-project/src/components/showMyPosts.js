import React, { useState, useEffect, useRef } from 'react';
import { getMyPosts, deleteUserPost, updatePost, watchPost } from '../service';
import { actions } from './store/actions';
import { connect } from 'react-redux';
import CreateNewPost from './CreateNewPost'
import { useParams } from 'react-router-dom';
import '../App.css';

function mapStateToProps(state) {
    return {
        MyPosts: state.postsReducer.posts,
    }
}

const mapDispatchToProps = (dispatch) => ({
    setMyPosts: (posts) => dispatch(actions.setMyPosts(posts)),
    deleteMyPost: (posts) => dispatch(actions.deletePost(posts)),
    updateMyPost: (posts) => dispatch(actions.updatePost(posts)),
    watchPostR: (post) => dispatch(actions.watchPost(post))
})


export default connect(mapStateToProps, mapDispatchToProps)(function ShowMyPosts(props) {
    const { email } = useParams()

    const { MyPosts, setMyPosts, deleteMyPost, updateMyPost, watchPostR } = props;
    const [showBody, setShowBody] = useState(-1);

    const [showCreate, setShowCreate] = useState(false);
    const [show, setShow] = useState(-1);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');


    function editPost(post) {
        setShow(post._id);
        setTitle(post.title)
        setBody(post.body)
    }

    function create() {
        setShowCreate(showCreate => !showCreate);
        console.log(showCreate);
    }


    useEffect(() => {
        getMyPosts().then(data => { console.log(data); setMyPosts(data) })
            .catch(err => { console.log(err) });
    }, [])

    function deletePost(post) {
        deleteUserPost(post._id).then(data => {
            deleteMyPost(data)

        }, err => { console.log(err); })
    }

    function savePost(itemId) {
        updatePost({ title: title, body: body, _id: itemId }).then(data => {
            updateMyPost(data.post);
            setShow(-1);
        }, err => {
            console.log(err);
        })

    }

    function watch(post) {
        setShowBody(post._id)
        console.log(post)
        watchPost(post).then(data => {
            watchPostR(data.post)
        }, err => {
            alert("faled to add the post")

        })
    }
    return (
        <>
            <h1 style={{ textAlign: 'center', marginBottom: '5%' }}>My Posts</h1>
            <div className='d-flex justify-content-center'>
                <button className="btn btn-light mt-1 mb-3" onClick={create} style={{ backgroundColor: 'rgb(222, 243, 243)', textAlign: 'center' }}>create new post</button>
                <br></br>
            </div>
            {
                showCreate ?
                    <CreateNewPost setShowCreate={setShowCreate}></CreateNewPost>
                    : ''}

            { MyPosts ?
                <div>
                    {MyPosts.map(item => (
                        <div key={item.id} className="row d-flex justify-content-center">
                            <div className="col-6 post-div">
                                <div><h4>{item.title}</h4></div>
                                {showBody == item._id ?
                                    <>
                                        <div>{item.body}</div>
                                        <br />
                                        <button className='mr-1 button' onClick={() => { setShowBody(-1) }} >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                                            </svg>
                                        </button>
                                    </>
                                    : ''}

                                {showBody != item._id ?

                                    <button className='mr-1 button' onClick={() => { watch(item) }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                    </svg>
                                    </button>
                                    : ''}<button className='mr-1 button' onClick={() => { deletePost(item) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-divash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                    </svg>
                                </button>
                                <button className="button" onClick={() => { editPost(item) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                    </svg>
                                </button>
                                <br />
                                <br />
                                {show == item._id ?
                                    <div>
                                        <input type="text" style={{ width: '99%' }} value={title} onChange={(e) => setTitle(e.target.value)}></input>
                                        <br />
                                        <br />
                                        <textarea type="text" rows="6" cols="49" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                                        <br />
                                        <br />
                                        <button onClick={() => { savePost(item._id) }} className='button'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-save-fill" viewBox="0 0 16 16">
                                                <path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v7.793L4.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 9.293V1.5z" />
                                            </svg>
                                        </button>
                                        <br />
                                        <br />
                                    </div>
                                    : ''}
                            </div>
                        </div>
                    ))}
                </div>
                : ''
            }
            < br />
        </>
    )
})