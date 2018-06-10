import { takeLatest } from "redux-saga/effects";
import {
    CREATE_USER_REQUEST,
    FETCH_CURRENT_USER_REQUEST,
    LOGIN_REQUEST,
    FORGOT_PASSWORD_REQUEST,
    VALIDATE_TOKEN_REQUEST,
    RESET_PASSWORD_REQUEST,
    //CONFIRM_TOKEN_REQUEST
} from "./types";
import {
    createUserSaga,
    fetchUserSaga,
    loginUserSaga,
    forgotPasswordUserSaga,
    validatePasswordSaga,
    resetPasswordUserSaga
    //confirmUserSaga
} from "./sagas/userSagas";

export default function* rootSaga() {
    yield takeLatest(CREATE_USER_REQUEST, createUserSaga);
    yield takeLatest(FETCH_CURRENT_USER_REQUEST, fetchUserSaga);
    yield takeLatest(LOGIN_REQUEST, loginUserSaga);
    yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordUserSaga);
    yield takeLatest(VALIDATE_TOKEN_REQUEST, validatePasswordSaga);
    yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordUserSaga);
    //yield takeLatest(CONFIRM_TOKEN_REQUEST, confirmUserSaga);
}
