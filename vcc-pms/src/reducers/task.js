const taskReducer = (state = { task: [] }, action) => {
    switch (action.type) {
      case 'FETCH_TASK':
        return { ...state, task: action.payload };
      default:
        return state;
    }
  };
  
  export default taskReducer;