import produce from 'immer';
import { addPost } from '../../../service';
import createReducer from "./reducerUtils";


const initialState = {
    posts: []
}


const posts = {
    setMyPosts(state, action) {
        state.posts = action.payload;
    },
    addPost(state, action) {
        state.posts.push(action.payload);
    },
    updatePost(state, action) {
        let pId = action.payload._id;
        let i = state.posts.findIndex(post => post._id === pId);
        state.posts[i] = action.payload;
    },
    deletePost(state, action) {
        let pId = action.payload;
        let i = state.posts.findIndex(post => post._id === pId);
        state.posts.splice(i, 1)
    }
}

export default produce((state, action) => createReducer(state, action, posts), initialState);


