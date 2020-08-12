import * as types from './../constants/ActionTypes';

var GenerateID = () => {
    var GenID = Math.floor(Math.random() * 100) + 1;
    var GenID2 = Math.floor(Math.random() * 100) + 1;
    return GenID + '-' + GenID2;
}

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data;

var myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.LIST_ALL : 
            return state;

        case types.ADD_TASK : 
            var newTask = {
                id : GenerateID(),
                name : action.task.name,
                status : action.task.status === 'true' ? true : false
            }
            state.push(newTask);
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];

        default : 
            return state;
    } 
}

export default myReducer;