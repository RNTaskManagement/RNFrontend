import React from 'react';

// import 'es6-symbol/implement';

import Nav from '../config/routes';

//for connecting to the store 
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux'
import combiner from '../reducers/Combiner'
import thunk from 'redux-thunk';
import firebaseConfig from '../config/FirebaseConfig'
// import logger from 'redux-logger';

var firebase = require('firebase');


export const store = createStore(
    combiner,
    applyMiddleware(thunk)
);


export default class App extends React.Component {

    constructor() {
        super()
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        console.log(firebaseConfig)
    }

    render() {
        return (
            <Provider store={store}>
                <Nav
                    ref={
                        nav => {
                            this.navigator = nav;
                        }
                    } />
            </Provider>
        );
    }
}

