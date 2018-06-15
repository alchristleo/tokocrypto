import { combineReducers } from 'redux';

import user from './reducers/user';
import cryptos from './reducers/crypto';
import currCrypto from './reducers/currentCrypto';
import currKurs from './reducers/currentKurs';
import transactions from './reducers/transaction';
import formErrors from './reducers/formErrors';
//import verifyEmail from './reducers/verifyEmail';

export default combineReducers({
    user,
    formErrors,
    currCrypto,
    cryptos,
    transactions,
    currKurs
    //verifyEmail
});

