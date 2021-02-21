import React, { useState, useRef } from 'react';
import { addPost } from '../service';
import { actions } from './store/actions';
import { connect } from 'react-redux';
import '../App.css';

function mapStateToProps(state) {
    return { MyPosts: state.postsReducer.posts }
}


const mapDispatchToProps = (dispatch) => ({
    addMyPost: (posts) => dispatch(actions.addPost(posts))
})

export default connect(mapStateToProps, mapDispatchToProps)(function CreateNewPost(props) {
    const { addMyPost, setShowCreate } = props;

    const titleRef = useRef('');
    const bodyRef = useRef('');
    // const pId = useRef('');

    function createPost() {
        if (titleRef.current.value != '' && bodyRef.current.value != '')
            addPost({ 'title': titleRef.current.value, 'body': bodyRef.current.value }).then(data => {
                addMyPost(data.post)
                setShowCreate(false);
            },
                err => {
                    console.log("error creating");
                })
        else
            console.log('nulllllllllllllllllll');
    }
    return (
        <>
            <div className='' style={{ textAlign: 'center' }}>
                <input id="title" type="text" ref={titleRef} style={{ textAlign: 'left' }} placeholder="title"></input>
                <br />
                <br />
                <textarea id="postBody" rows="6" cols="18" ref={bodyRef} placeholder="body"></textarea>
                <br></br>
                <br />
                <button className='btn btn-light' onClick={createPost} style={{ backgroundColor: 'rgb(222, 243, 243)'}}>add</button>
            </div>
            <br />
        </>
    )
})