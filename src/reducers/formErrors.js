import {
    CREATE_USER_FAILURE,
    CREATE_USER_REQUEST,
    LOGIN_REQUEST,
    LOGIN_FAILURE
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
        default:
            return state;
    }
}