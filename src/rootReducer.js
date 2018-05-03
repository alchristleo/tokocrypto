import { combineReducers } from 'redux';

import user from './reducers/user';
import cryptos from './reducers/crypto';
import formErrors from './reducers/formErrors';

export default combineReducers({
    user,
    formErrors,
    cryptos
});

