import React, { Component } from 'react';
import { connect } from 'react-redux';

const { height: HEIGHT } = Dimensions.get('window');

import {
    Platform,
    StyleSheet,
    Image,
    View,
    ImageBackground,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Text,
    StatusBar,
    SafeAreaView,
    Alert
} from 'react-native';

class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //put state item here
        };
    }

    render() {
        return (
            <View style={{ backgroundColor: 'black', height: HEIGHT }}><Text>Hello world</Text></View>
        );
    }
}

function mapStateToProps(state) {
    return {
        //add mappers here
    }
}

export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({

})