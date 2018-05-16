import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    LOGIN_REQUEST,
    LOGIN_FAILURE
} from '../types';
import api from '../api';
import setAuthorizationHeader from '../utils/setAuthorizationHeader';

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
});

export const userLoginRequest = user => ({
    type: LOGIN_REQUEST,
    user
});

export const userLoginFailure = errors => ({
    type: LOGIN_FAILURE,
    errors
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

export const logout = () => dispatch => {
    localStorage.removeItem("tcJWT");
    setAuthorizationHeader();
    dispatch(userLoggedOut());
};