import { createSelector } from "reselect";
import { TRANSACTIONS_FETCHED, TRANSACTIONS_CREATED } from '../types';

export default function transactions(state = {}, action = {}){
	switch(action.type){
		case TRANSACTIONS_FETCHED:
		case TRANSACTIONS_CREATED:
			return { ...state, ...action.data.entities.transactions }; 
		default: 
			return state;
	}
}

// selectors
export const transactionsSelector = state => state.transactions;

export const allTransactionsSelector = createSelector(
	transactionsSelector,
	transactionHash => Object.values(transactionHash)
);
