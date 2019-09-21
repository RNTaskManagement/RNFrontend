import React from 'react';

import 'es6-symbol/implement';

import Nav from '../config/routes';

//for connecting to the store 
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux'
import combiner from '../reducers/Combiner'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const store = createStore(
    combiner,
    applyMiddleware(thunk, logger)
);


export default class App extends React.Component {

    render() {
        //DEBUG ONLY
        console.disableYellowBox = true;
        return (
            //provider makes sure that store is available throughout the app
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

