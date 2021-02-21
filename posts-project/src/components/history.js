import React, { useState, useEffect } from 'react';
import { getHistoryPosts } from '../service';
import { actions } from './store/actions';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

function mapStateToProps(state) {
    return { historyPosts: state.historyPostsReducer.historyPosts }
}


const mapDispatchToProps = (dispatch) => ({
    setHistoryPosts: (posts) => dispatch(actions.setHistoryPosts(posts))
})


export default connect(mapStateToProps, mapDispatchToProps)(function History(props) {
    const { email } = useParams();
    const { historyPosts, setHistoryPosts } = props



    useEffect(() => {
        getHistoryPosts().then(data => { console.log(data); setHistoryPosts(data) })
            .catch(err => { console.log(err) });
    }, [])



    return (
        <>
            <h1 style={{ textAlign: 'center', marginBottom: '5%' }}>History Watching Posts</h1>
            { historyPosts ?
                <div>
                    {historyPosts.map(item => (
                        <div key={item.id} className="row d-flex justify-content-center">
                            <div className="col-6 post-div">
                                <div><h5>{item.title}</h5></div>
                                <div>{item.body}</div>
                                <br/>
                            </div>
                        </div>
                    ))}
                </div>
                : ''
            }
        </>
    )
})