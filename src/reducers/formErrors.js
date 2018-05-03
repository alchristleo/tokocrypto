import { CREATE_USER_FAILURE, CREATE_USER_REQUEST } from "../types";

export default function formErrors(state = {}, action = {}) {
    switch (action.type) {
        case CREATE_USER_REQUEST:
            return { ...state, register: {} };
        case CREATE_USER_FAILURE:
            return { ...state, register: action.errors };
        default:
            return state;
    }
}