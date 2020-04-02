const INITIAL_STATE = { notes: {} , 
                        id: null, 
                        lastEdit: null,
                        title: ' ', 
                        body: ' ', 
                        loading: false, 
                        error: ''
                                };

import {    FETCH_NOTES, NOTES_FETCH_SUCCESS, NOTE_CREATE, NOTE_UPDATE, 
            NOTE_EDIT, SAVE_NOTE, DELETE_NOTE, DELETE_NOTE_SUCCESS } from '../actions/types';

export default AuthReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_NOTES:
            return { ...state, loading: true };
        case NOTES_FETCH_SUCCESS:
            return { notes: action.payload, loading: false };
        case NOTE_UPDATE:
            return { ...state, ...INITIAL_STATE, loading: false };
        case NOTE_EDIT:
            return { ...state, [action.payload.prop]: action.payload.value };
        case NOTE_CREATE:
            return {...state, ...INITIAL_STATE, loading: false };
        case SAVE_NOTE:
            return { ...state, loading: true, error: '' };
        case DELETE_NOTE:
            return { ...state, loading: true };
        case DELETE_NOTE_SUCCESS:
            return { ...state, loading: false };
        default:
            return state;

    };
};