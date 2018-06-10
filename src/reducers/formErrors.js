import {
    CREATE_USER_FAILURE,
    CREATE_USER_REQUEST,
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAILURE,
    VALIDATE_TOKEN_REQUEST,
    VALIDATE_TOKEN_FAILURE
} from "../types";

export default function formErrors(state = {}, action = {}) {
    switch (action.type) {
        case CREATE_USER_REQUEST:
            return { ...state, register: {} };
        case CREATE_USER_FAILURE:
            return { ...state, register: action.errors };
        case LOGIN_REQUEST:
            return { ...state, login: {} };
        case LOGIN_FAILURE:
            return { ...state, login: action.errors };
        case FORGOT_PASSWORD_REQUEST:
            return { ...state, forgot_password: {} };
        case FORGOT_PASSWORD_FAILURE:
            return { ...state, forgot_password: action.errors };
        case VALIDATE_TOKEN_REQUEST:
            return { ...state, validate_token: {} };
        case VALIDATE_TOKEN_FAILURE:
            return { ...state, validate_token: action.errors };
        case RESET_PASSWORD_REQUEST:
            return { ...state, reset_password: {} };
        case RESET_PASSWORD_FAILURE:
            return { ...state, reset_password: action.errors };
        default:
            return state;
    }
}