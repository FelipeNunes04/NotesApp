import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import NoteReducer from './NoteReducer';
import SelectionReducer from './SelectionReducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    note: NoteReducer,
    selectedNote: SelectionReducer
});

export default rootReducer;