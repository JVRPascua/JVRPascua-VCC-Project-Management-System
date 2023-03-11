export default (state = {project: []}, action) => {
    switch (action.type) {
        case 'FETCH_PROJECT':
            return {...state, project: action.payload}
        default:
            return state;
        }
    }