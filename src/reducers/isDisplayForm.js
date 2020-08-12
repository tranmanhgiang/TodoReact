import * as types from './../constants/ActionTypes';

var initialState = false;

var myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.OPEN_FORM : 
            return true;

        case types.CLOSE_FORM :
            return false;
    
        default : 
            return state;
    } 
}

export default myReducer;