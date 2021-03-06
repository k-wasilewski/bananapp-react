import {SET_USERNAME} from './actions';

const initialState = {
    username: 0
};

export default function setUsernameReducer(state = initialState, action) {
    switch(action.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: action.data
            };
        default:
            return state;
    }
};

