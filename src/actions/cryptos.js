import { CRYPTOS_FETCHED } from '../types';
import api from '../api';

const cryptosFetched = (data) => ({
	type: CRYPTOS_FETCHED,
	data
});

export const fetchBooks = () => dispatch => 
	api.books.fetchAll()
		.then(books => dispatch(booksFetched(data)));
