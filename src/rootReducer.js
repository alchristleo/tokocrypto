import { combineReducers } from 'redux';

import user from './reducers/user';
import cryptos from './reducers/crypto';
import currCrypto from './reducers/currentCrypto';
import transactions from './reducers/transaction';
import formErrors from './reducers/formErrors';

export default combineReducers({
    user,
    formErrors,
    currCrypto,
    cryptos,
    transactions,
});

