import { call, put } from 'redux-saga/effects';
import {
    userLoggedIn,
    userLoginFailure,
    // confirmTokenFailure 
} from '../actions/auth';
import { createUserFailure } from '../actions/users';
import api from '../api';
import history from '../history';
import setAuthorizationHeader from '../utils/setAuthorizationHeader';

export function* createUserSaga(action) {
    try {
        const user = yield call(api.user.register, action.user);
        localStorage.tcJWT = user.token;
        setAuthorizationHeader(user.token);
        yield put(userLoggedIn(user));
        history.push("/dashboard");
    } catch (err) {
        yield put(createUserFailure(err.response.data.errors));
    }
}

export function* loginUserSaga(action) {
    try {
        const user = yield call(api.user.login, action.user);
        localStorage.tcJWT = user.token;
        setAuthorizationHeader(user.token);
        yield put(userLoggedIn(user));
        history.push("/dashboard");
    } catch (err) {
        yield put(userLoginFailure(err.response.data.errors));
    }
}

export function* fetchUserSaga() {
    const user = yield call(api.user.fetchCurrentUser);
    yield put(userLoggedIn(user));
}

// export function* confirmUserSaga(action) {
//     try {
//         const user = yield call(api.user.confirm, action.token);
//         localStorage.tcJWT = user.token;
//         setAuthorizationHeader(user.token);
//         yield put(userLoggedIn(user));
//     } catch (err) {
//         yield put(confirmTokenFailure(err.response.data.errors));
//     }
// }