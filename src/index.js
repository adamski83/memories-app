import React from 'react';
import {GoogleOAuthProvider} from "@react-oauth/google";
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware,compose} from "redux";
import thunk from 'redux-thunk';

import reducers from './reducers'

import App from './App';
import './index.css'

const store = createStore(reducers,compose(applyMiddleware(thunk)))


ReactDOM.render(
    <GoogleOAuthProvider clientId='413389514172-9fk6urvru60fp1ogc5ihhrkicrn9j0ul.apps.googleusercontent.com'>
        <Provider store={store}>
            <App />
        </Provider>,
    </GoogleOAuthProvider>,
    document.getElementById('root')
);


