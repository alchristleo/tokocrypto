import { normalize } from 'normalizr';
import { TRANSACTIONS_FETCHED, TRANSACTIONS_CREATED } from '../types';
import api from '../api';
import { transactionSchema } from '../schemas/transactionSchema';

const transactionsFetched = (data) => ({
	type: TRANSACTIONS_FETCHED,
	data
});

const transactionCreated = (data) => ({
	type: TRANSACTIONS_CREATED,
	data
});

export const fetchTransactions = () => dispatch =>
	api.transactions.fetchAll()
		.then(transactions => dispatch(transactionsFetched(normalize(transactions, [transactionSchema]))));

export const createTransactions = data => dispatch =>
	api.transactions
		.create(data)
		.then(transaction => dispatch(transactionCreated(normalize(transaction, transactionSchema))));
