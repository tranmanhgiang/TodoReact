import * as types from './../constants/ActionTypes';

var GenerateID = () => {
    var GenID = Math.floor(Math.random() * 100) + 1;
    var GenID2 = Math.floor(Math.random() * 100) + 1;
    return GenID + '-' + GenID2;
}

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.LIST_ALL : 
            return state;

        case types.SAVE_TASK : 
            var task = {
                id : action.task.id,
                name : action.task.name,
                status : action.task.status === 'true' ? true : false
            };
            if(!task.id) {
                task.id = GenerateID()
                state.push(task); 
            } else {
                state = state.map(item => {
                    if(item.id === action.task.id) {
                        item = task;
                    }
                    return item;
                });
            }
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];

        case types.UPDATE_STATUS_TASK :          
            state = state.map(task => {
                if(task.id === action.id) {
                    task.status = !task.status;
                }
                return task;
            });
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];
        
        case types.DELETE_TASKS :
            state = state.filter(task => task.id !== action.id);
            localStorage.setItem('tasks',JSON.stringify(state));
            return state;

        default : 
            return state;
    } 
}

export default myReducer; 