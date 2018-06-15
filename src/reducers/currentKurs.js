import { CURRENT_KURS_FETCHED } from '../types';

export default function currKurs(state = {}, action = {}) {
    switch (action.type) {
        case CURRENT_KURS_FETCHED:
            return { ...state, currKurs: action.data };
        default:
            return state;
    }
}
