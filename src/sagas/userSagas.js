import { call, put } from 'redux-saga/effects';
import { userLoggedIn } from '../actions/auth';
import api from '../api';
import history from '../history';

export function* fetchUserSaga(){
    const user = yield call(api.user.fetchCurrentUser);
    yield put(userLoggedIn(user));
}