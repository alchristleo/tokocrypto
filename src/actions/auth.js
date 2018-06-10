import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAILURE,
    VALIDATE_TOKEN_REQUEST,
    VALIDATE_TOKEN_FAILURE
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

export const forgotPasswordRequest = user => ({
    type: FORGOT_PASSWORD_REQUEST,
    user
});

export const forgotPasswordFailure = errors => ({
    type: FORGOT_PASSWORD_FAILURE,
    errors
});

export const validateTokenRequest = token => () => api.user.validate_token(token);

export const validateTokenFailure = errors => ({
    type: VALIDATE_TOKEN_FAILURE,
    errors
});

export const resetPasswordRequest = data => () => api.user.reset_password(data);

export const resetPasswordFailure = errors => ({
    type: RESET_PASSWORD_FAILURE,
    errors
});

// export const validateTokenRequest = token => ({
//     type: VALIDATE_TOKEN_REQUEST,
//     token
// })

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