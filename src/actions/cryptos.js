import { normalize } from 'normalizr'; 
import { CRYPTOS_FETCHED, CRYPTOS_CREATED } from '../types';
import api from '../api';
import { cryptoSchema } from '../schema';

const cryptosFetched = (data) => ({
	type: CRYPTOS_FETCHED,
	data
});

const cryptoCreated = (data) => ({
	type: CRYPTOS_CREATED,
	data
});

export const fetchCryptos = () => dispatch => 
	api.cryptos.fetchCurrent()
		.then(cryptos => dispatch(cryptosFetched(normalize(cryptos, [cryptoSchema]))));

export const createCryptos = data => dispatch =>
	api.cryptos
		.create(data)
		.then(crypto => dispatch(cryptoCreated(normalize(crypto, cryptoSchema))));
