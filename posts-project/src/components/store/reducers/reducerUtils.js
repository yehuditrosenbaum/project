export default function createReducer(state, action, handlers) {
    if (handlers[action.type]) {
        handlers[action.type](state, action);
    }
}