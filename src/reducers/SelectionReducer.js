import { SELECT_NOTE } from '../actions/types';
const INITIAL_STATE = { id: null };

export default SelectionReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SELECT_NOTE:
            return { ...state, id: action.payload };
        default:
            return state;
    }
};