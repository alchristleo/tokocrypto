import { createSelector } from "reselect";
import { CRYPTOS_FETCHED, CRYPTOS_CREATED } from '../types';

export default function cryptos(state = {}, action = {}) {
	switch (action.type) {
		case CRYPTOS_FETCHED:
		case CRYPTOS_CREATED:
			return { ...state, ...action.data.entities.cryptos };
		default:
			return state;
	}
}

// selectors
export const cryptosSelector = state => state.cryptos;

export const allCryptosSelector = createSelector(
	cryptosSelector,
	cryptoHash => Object.values(cryptoHash)
);
