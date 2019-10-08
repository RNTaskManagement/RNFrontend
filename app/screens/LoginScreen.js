import React, { Component } from 'react';
import { connect } from 'react-redux';

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

const firebase = require('firebase')

const { width: WIDTH } = Dimensions.get('window');

class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //put state item here
            userName: '',
            password: ''
        };
    }

    render() {
        return (
            <ImageBackground style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} />
                    <Text style={styles.logoText}> TEAM TASKS </Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={'UserName'}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        onChangeText={(text) => { this.setState({ userName: text }) }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        onChangeText={(text) => { this.setState({ password: text }) }}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                    />
                    <TouchableOpacity style={styles.btnEye}></TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btnLogin} onPress={() => { this.signup(this.state.userName, this.state.password) }}>
                    <Text style={styles.text}> Login </Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }

    //these should go into store
    async signup(email, pass) {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, pass);
            this.props.navigation.navigate({ routeName: 'HomeScreen' })
            console.log('didnt work')
            // Navigate to the Home page, the user is auto logged in
        } catch (error) {
            console.log(error.toString());
        }
    }

    //signup('abc@gmail.com', 'abcdef');

    async login(email, pass) {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, pass);

            console.log('Logged In!');

            // Navigate to the Home page
        } catch (error) {
            console.log(error.toString());
        }
    }


    //login('abc@gmail.com', 'abcdef');

    async logout() {
        try {
            await firebase.auth().signOut();
            console.log('Logged Out');
            // Navigate to login view
        } catch (error) {
            console.log(error);
        }
    }

    //logout();
}

function mapStateToProps(state) {
    return {
        //add mappers here
    }
}

export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
        backgroundColor: '#000000',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logo: {},
    logoText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.5,
    },
    inputContainer: {
        marginTop: 10,
    },
    input: {
        width: WIDTH - 65,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(32, 76, 31, 0.7)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25,
    },
    inputIcon: {
        position: 'absolute',
        top: 10,
        left: 37,
    },
    btnLogin: {
        width: WIDTH - 65,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'rgba(7, 243, 125, 0.9)',
        justifyContent: 'center',
        marginTop: 20,
    },
    text: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center',
    },
});

