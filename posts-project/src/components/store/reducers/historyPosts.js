import produce from 'immer';
import createReducer from "./reducerUtils";


const initialState = {
    historyPosts: []
}


const historyPosts = {
    setHistoryPosts(state, action) {
        state.historyPosts = action.payload;
    },
    watchPost(state, action) {
        state.historyPosts.push(action.payload);
    }
}

export default produce((state, action) => createReducer(state, action, historyPosts), initialState);


