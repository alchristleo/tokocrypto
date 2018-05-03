import { createSelector } from "reselect";
import { CRYPTOS_FETCHED } from '../types';

export default function cryptos(state = {}, action = {}){
	switch(action.type){
		case CRYPTOS_FETCHED: 
		// case CRYPTOS_CREATED:
		// 	return { ...state, ...action.data.entities.books }; 
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
