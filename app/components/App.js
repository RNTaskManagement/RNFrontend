import React from 'react';

// import 'es6-symbol/implement';

import Nav from '../config/routes';

//for connecting to the store 
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux'
import combiner from '../reducers/Combiner'
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import { View, Text } from 'react-native'
export const store = createStore(
    combiner
);

//provider makes sure that store is available throughout the app
// <Provider store={store}>
//     <Nav
//         ref={
//             nav => {
//                 this.navigator = nav;
//             }
//         } />
// </Provider>

export default class App extends React.Component {

    render() {
        return (
            // <View>
            //     <Text>Hello world</Text>
            // </View>
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

