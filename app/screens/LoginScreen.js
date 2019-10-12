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


import renderIf from '../utils/renderif'

const { width: WIDTH } = Dimensions.get('window');

class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //put state item here
            userName: '',
            password: '',
            confirmPassword: '',
            isSignedIn: false,
            isNewUser: false
        };
    }

    componentDidMount() {
        // if (firebase.auth().currentUser) {
        //     this.props.navigation.navigate({ routeName: 'HomeScreen' })
        // }
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
                        placeholder={'Email'}
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
                {renderIf(!this.state.isNewUser)(
                    <View>
                        <View>
                            <TouchableOpacity style={styles.btnLogin} onPress={() => { this.login() }}>
                                <Text style={styles.text}> Login </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => {
                            this.toggleSignIn();
                        }}>
                            <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}> New user? Please register </Text>
                        </TouchableOpacity>
                    </View>
                )
                }

                {/* two renderif due to react native improper margin bug */}
                {renderIf(this.state.isNewUser)(
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder={'Cofirm Password'}
                            secureTextEntry={true}
                            onChangeText={(text) => { this.setState({ confirmPassword: text }) }}
                            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        />
                        <TouchableOpacity style={styles.btnEye}></TouchableOpacity>
                    </View>
                )
                }
                {renderIf(this.state.isNewUser)(
                    <View>
                        <View>
                            <TouchableOpacity style={styles.btnLogin} onPress={() => { this.signup() }}>
                                <Text style={styles.text}> Register </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => {
                            this.toggleSignIn();
                        }}>
                            <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}> Already have and account? Login </Text>
                        </TouchableOpacity>
                    </View>
                )
                }

            </ImageBackground>
        );
    }

    toggleSignIn() {
        this.setState({
            isNewUser: !this.state.isNewUser
        })
    }

    //these should go into store
    signup() {
        if (this.state.password === this.state.confirmPassword) {
            try {
                firebase.auth().createUserWithEmailAndPassword(this.state.userName, this.state.password).then((user) => {
                    console.log('i am in')
                    this.props.navigation.navigate({ routeName: 'HomeScreen' })
                })
                // Navigate to the Home page, the user is auto logged in
            } catch (error) {
                console.log(error.toString());
            }
        } else {
            //this should be replaced ith dynamic check with tick and cross
            Alert.alert(
                'Password doesnt match',
                'Confirm password and password doesn\'t match',
                [

                ],
                { cancelable: true },
            );
        }

    }

    //signup('abc@gmail.com', 'abcdef');

    login() {
        try {
            firebase.auth().signInWithEmailAndPassword(this.state.userName, this.state.password).then((user) => {
                console.log(user)
                if (user) {
                    this.props.navigation.navigate({ routeName: 'HomeScreen' })
                } else {

                }
            })

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

export default connect(mapStateToProps)(LoginScreen)

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
        backgroundColor: 'rgba(32, 76, 31, 0.5)',
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
        backgroundColor: 'rgba(7, 243, 125, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center',
    },
});

