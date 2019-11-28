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
var db;

class SettingsScreen extends Component {

    constructor(props) {
        super(props);

        db = firebase.firestore();

        this.state = {
            //put state item here
            userName: 'NewUser'
        };
    }

    componentDidMount() {
        if (firebase.auth().currentUser) {
            this.setState({ userName: firebase.auth().currentUser.displayName })
        }
    }

    render() {
        return (
            <ImageBackground style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    <Image source={{ uri: 'http://www.icons101.com/icon_ico/id_78917/user.ico' }} style={{ width: 100, height: 100 }} />
                    <Text style={styles.logoText}> Signed in as <Text style={{ color: 'green' }}>: {this.state.userName}</Text> </Text>
                </View>
                <View style={{ alignItems: 'center', alignContent: 'center' }}>
                    <Text style={styles.teamName}>Joined Team: <Text style={{ color: '#fff' }}>{this.props.teamName}</Text></Text>
                </View>
                <View style={{ alignItems: 'center', alignContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            let that = this
                            firebase.auth().signOut().then(function () {
                                that.props.navigation.navigate('LoginScreen')
                            }).catch(function (error) {
                                // An error happened.
                            });
                        }}>
                        <Text style={styles.moveBtn}>Sign-out</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', alignContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('MainScreen')
                        }}>
                        <Text style={styles.moveBtn}>Go to main screen</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }




}

function mapStateToProps(state) {
    return {
        //add mappers here
        teamName: state.Session.teamName
    }
}

export default connect(mapStateToProps)(SettingsScreen)

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
    logoText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.9,
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
    moveBtn: {
        margin: 10,
        width: 200,
        paddingTop: 5,
        paddingBottom: 5,
        color: 'rgba(7, 243, 125, 1)',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    teamName: {
        margin: 10,
        width: 200,
        paddingTop: 5,
        paddingBottom: 5,
        color: 'rgba(7, 243, 125, 1)',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

