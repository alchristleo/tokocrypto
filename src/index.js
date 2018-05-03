import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import decode from "jwt-decode";
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { userLoggedIn } from './actions/auth';
//import {fetchCurrentUserSuccess, fetchCurrentUserRequest} from "./actions/users";
import setAuthorizationHeader from './utils/setAuthorizationHeader';
import rootReducer from "./rootReducer";
import history from './history';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware, thunk))
);
sagaMiddleware.run(rootSaga);

if (localStorage.tcJWT) {
    setAuthorizationHeader(localStorage.tcJWT);
    const payload = decode(localStorage.tcJWT);
    const user = {
        token: localStorage.tcJWT,
        email: payload.email,
        username: payload.username
    };
    store.dispatch(userLoggedIn(user));
    //store.dispatch(fetchCurrentUserRequest());
} 
// else {
//     store.dispatch(fetchCurrentUserSuccess({}));
// }

ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </Router>, 
    document.getElementById('root'));
registerServiceWorker();
