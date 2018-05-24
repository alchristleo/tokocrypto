import { takeLatest } from "redux-saga/effects";
import {
    CREATE_USER_REQUEST,
    FETCH_CURRENT_USER_REQUEST,
    LOGIN_REQUEST,
    //CONFIRM_TOKEN_REQUEST
} from "./types";
import {
    createUserSaga,
    fetchUserSaga,
    loginUserSaga,
    //confirmUserSaga
} from "./sagas/userSagas";

export default function* rootSaga() {
    yield takeLatest(CREATE_USER_REQUEST, createUserSaga);
    yield takeLatest(FETCH_CURRENT_USER_REQUEST, fetchUserSaga);
    yield takeLatest(LOGIN_REQUEST, loginUserSaga);
    //yield takeLatest(CONFIRM_TOKEN_REQUEST, confirmUserSaga);
}
