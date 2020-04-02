import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { FETCH_NOTES, NOTES_FETCH_SUCCESS, NOTE_CREATE, NOTE_UPDATE, NOTE_EDIT, 
    SAVE_NOTE, SELECT_NOTE, DELETE_NOTE, DELETE_NOTE_SUCCESS, NOTE_CLEAR } from './types';

export const fetchNotes = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        dispatch({type: FETCH_NOTES });
        firebase.database().ref(`/users/${currentUser.uid}/notes`)
        .on('value', snapshots => {
            const notes = [];
            snapshots.forEach((snapshot) => {
                const note = snapshot.val()
                note.id = snapshot.key
                notes.push(note)
            });
            dispatch({type: NOTES_FETCH_SUCCESS, payload: notes });
        });
    };
};

export const editNote = ({ prop, value }) => {
    return {
        type: NOTE_EDIT,
        payload: { prop, value }
    };
};

export const clearForm = () => {
    return (dispatch) => {
        dispatch({ type: NOTE_CLEAR });
    };
}

export const updateNote = (note, props) => {
    const { currentUser } = firebase.auth();
    const { title, body, id } = note;
    const lastEdit = new Date().toLocaleString();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/notes/${id}`)
        .set({title, body, lastEdit})
        .then((res) => {
            dispatch({ type: NOTE_UPDATE });
            Actions.reset('main');
        });
    };
};

export const deleteNote = ({ id }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        dispatch({ type: DELETE_NOTE });

        firebase.database().ref(`/users/${currentUser.uid}/notes/${id}`).remove()
        .then(() => {
            dispatch({ type: DELETE_NOTE_SUCCESS });
            Actions.reset('main');
        })
    }
};
  


export const createNote = ({ title, body }) => {
    const { currentUser } = firebase.auth();
    const lastEdit = new Date().toLocaleString();

    return (dispatch) => {
        dispatch({ type: SAVE_NOTE });

        firebase.database().ref(`/users/${currentUser.uid}/notes`)
        .push({title, body, lastEdit})
        .then((res) => {

            const id = res.getKey();
            firebase.database().ref(`/users/${currentUser.uid}/notes/${res.getKey()}/id`).set(id)
            .then(() => {
                dispatch({ type: NOTE_CREATE });
                Actions.reset('main');
            });
        });
    };
};

export const selectNote = ({ id }) => {
    return {
        type: SELECT_NOTE,
        payload: id 
    };

};

