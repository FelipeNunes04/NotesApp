import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {    
    EMAIL_CHANGED, 
    USER_CHANGED,
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';

export const emailChanged = (email) => {
    return {
        type: EMAIL_CHANGED,
        payload: email
    };
};

export const changeUser = (user) => {
    return {
        type: USER_CHANGED,
        payload: user
    };
};

export const passwordChanged =  (password) => {
    return {
        type: PASSWORD_CHANGED,
        payload: password
    };
};

export const loginUser = ({email, password}) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => loginUserSucess(dispatch, user))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(user => loginUserSucess(dispatch, user))
        .catch(() => loginUserFail(dispatch));
        });
    };
};

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSucess = (dispatch, user ) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.reset('main');
};