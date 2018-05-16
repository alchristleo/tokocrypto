import { BALANCE_ADD, BALANCE_SUBSTRACT } from '../types';
const initialState = {
    user: {
        balance: 10000000
    }
}

export default function balance(state = initialState, action = {}){
	switch(action.type){
        case BALANCE_SUBSTRACT:
            state = {
                ...user,
                user.balance: user.balance - action.payload
            };
            break;
		case BALANCE_ADD:
			return { ...state, ...action.data.entities.cryptos }; 
    }
    return state;
}

