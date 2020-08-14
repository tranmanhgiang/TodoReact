import * as types from './../constants/ActionTypes';

var initialState = {
    by: '',
    value: 1 // 1 : A-Z, -1 : Z-A
};

var myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SORT :
            return action.sort;

        default : 
            return state;
    } 
}

export default myReducer;