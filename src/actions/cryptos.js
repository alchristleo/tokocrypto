import { normalize } from 'normalizr';
import { CRYPTOS_FETCHED, CRYPTOS_CREATED, CURRENT_CRYPTO_FETCHED, CURRENT_KURS_FETCHED } from '../types';
import api from '../api';
import { cryptoSchema } from '../schemas/cryptoSchema';

const cryptosFetched = (data) => ({
	type: CRYPTOS_FETCHED,
	data
});

const cryptoCreated = (data) => ({
	type: CRYPTOS_CREATED,
	data
});

const currCryptoFetched = (data) => ({
	type: CURRENT_CRYPTO_FETCHED,
	data
});

const currKursFetched = (data) => ({
	type: CURRENT_KURS_FETCHED,
	data
});

export const fetchCryptos = () => dispatch =>
	api.cryptos.fetchCurrent()
		.then(cryptos => dispatch(cryptosFetched(normalize(cryptos, [cryptoSchema]))));

export const createCryptos = data => dispatch =>
	api.cryptos
		.create(data)
		.then(crypto => dispatch(cryptoCreated(normalize(crypto, cryptoSchema))));

export const fetchCurrCrypto = data => dispatch => dispatch(currCryptoFetched(data));

export const fetchCurrKurs = data => dispatch => dispatch(currKursFetched(data));