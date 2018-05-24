import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    // CONFIRM_TOKEN_REQUEST,
    // CONFIRM_TOKEN_FAILURE
} from '../types';
import setAuthorizationHeader from '../utils/setAuthorizationHeader';
import api from '../api';

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

// export const confirmTokenRequest = token => ({
//     type: CONFIRM_TOKEN_REQUEST,
//     token
// });

// export const confirmTokenFailure = errors => ({
//     type: CONFIRM_TOKEN_FAILURE,
//     errors
// });

export const confirm = token => dispatch =>
    api.user.confirm(token).then(user => {
        localStorage.alcphoneJWT = user.token;
        dispatch(userLoggedIn(user));
    });