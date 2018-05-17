import { CURRENT_CRYPTO_FETCHED } from '../types';

export default function currCrypto(state = {}, action = {}) {
    switch (action.type) {
        case CURRENT_CRYPTO_FETCHED:
            return { ...state, currCrypto: action.data };
        default:
            return state;
    }
}
