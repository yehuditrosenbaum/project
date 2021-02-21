import { createStore, combineReducers, applyMiddleware } from 'redux';
import postsReducer from './reducers/posts'
import historyPostsReducer from './reducers/historyPosts'

const reducer = combineReducers({ postsReducer, historyPostsReducer });
const store = createStore(reducer);
window.store = store;
export default store;