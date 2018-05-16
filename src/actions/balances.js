import { BALANCE_SUBSTRACT, BALANCE_ADD } from '../types';

export function addBalance(number){
	return {
        type: BALANCE_ADD,
	    payload: number
    };
};
export function subsBalance(number){
	return {
        type: BALANCE_SUBSTRACT,
	    payload: number
    };
};
// const transactionCreated = (data) => ({
// 	type: TRANSACTIONS_CREATED,
// 	data
// });

// export const fetchCryptos = () => dispatch => 
// 	api.transactions.fetchAll()
// 		.then(transactions => dispatch(transactionsFetched(normalize(transactions, [transactionSchema]))));

// export const createTransactions = data => dispatch =>
// 	api.transactions
// 		.create(data)
// 		.then(transaction => dispatch(transactionCreated(normalize(transaction, transactionSchema))));
