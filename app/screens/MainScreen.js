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
    Alert,
    ScrollView
} from 'react-native';

const firebase = require('firebase')
var db;

import renderIf from '../utils/renderif'

const { width: WIDTH } = Dimensions.get('window');

class MainScreen extends Component {

    constructor(props) {
        super(props);

        db = firebase.firestore();

        this.state = {
            //put state item here
            userName: '',
            teamName: '',
            memberName: '',
            createTeam: true,
            addMembers: false
        };
    }

    componentDidMount() {
        if (firebase.auth().currentUser)
            this.setState({ userName: firebase.auth().currentUser.displayName })

    }

    render() {
        return (
            // scrollview should be added
            <ImageBackground style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} />
                    <Text style={styles.logoText}> Hi, </Text>
                    <Text style={styles.userName}>{this.state.userName}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.btn} onPress={() => { this.setState({ createTeam: false }) }}>
                        <Text style={styles.text}> Join Team </Text>
                    </TouchableOpacity>
                    <View style={{ width: 10 }}></View>
                    <TouchableOpacity style={styles.btn} onPress={() => { this.setState({ createTeam: true }) }}>
                        <Text style={styles.text}> Create Team </Text>
                    </TouchableOpacity>
                </View>

                {renderIf(this.state.createTeam)(
                    <ImageBackground style={styles.workContainer}>
                        <Text style={styles.workAreaHeading}>Create new team</Text>
                        <TextInput
                            style={styles.inputa}
                            placeholder={'Team Name'}
                            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                            onChangeText={(text) => { this.setState({ teamName: text }) }}
                        />
                        <TextInput
                            style={styles.inputa}
                            placeholder={'Member Name'}
                            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                            onChangeText={(text) => { this.setState({ memberName: text }) }}
                        />
                        <TouchableOpacity onPress={() => { this.createTeam() }}>
                            <Text style={styles.submitText} >Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.checkTeam()}>
                            <Text style={styles.submitText} >Go to team</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                )
                }

                {renderIf(!this.state.createTeam)(
                    <ImageBackground style={styles.workContainer}>
                        <Text style={styles.workAreaHeading}>Join Team</Text>
                        <TextInput
                            style={styles.inputa}
                            placeholder={'Team Name'}
                            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                            onChangeText={(text) => { this.setState({ teamName: text }) }}
                        />
                        <TouchableOpacity onPress={() => this.checkTeam()} >
                            <Text style={styles.submitText} >Submit</Text>
                        </TouchableOpacity>

                    </ImageBackground>
                )
                }


                {/* <View style={styles.inputContainer}>
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
                </View> */}
                {/* {renderIf(!this.state.isNewUser)(
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
                } */}

                {/* two renderif due to react native improper margin bug */}
                {/* {renderIf(this.state.isNewUser)(
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
                } */}
                {/* {renderIf(this.state.isNewUser)(
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
                } */}

            </ImageBackground>
        );
    }

    createorUpdateTeam() {
        if (this.state.addMembers) {
            this.updateTeam()
        } else {
            this.createTeam()
        }

    }

    //just to make things work now 
    //needs to change

    createTeam() {
        console.log('+++++++++++')
        let state = this.state;
        db.collection("users").where("name", "==", this.state.memberName).get().
            then(function (querySnapshot) {
                if (querySnapshot.empty) {
                    Alert.alert(
                        'User doesnot exists',
                        'Please confirm member is registered with us',
                        [

                        ],
                        { cancelable: true },
                    );
                } else {
                    db.collection("users").doc(querySnapshot.docs[0].id).update({ teams: firebase.firestore.FieldValue.arrayUnion(state.teamName) })
                    db.collection("teams").where("teamName", "==", state.teamName)
                        .get()
                        .then(function (querySnapshot) {
                            if (querySnapshot.empty) {
                                console.log(state.teamName)
                                db.collection("teams").add({
                                    teamName: state.teamName,
                                    members: [state.memberName],
                                }).then((result) => {
                                    Alert.alert(
                                        'Member added',
                                        'Member added to the team',
                                        [

                                        ],
                                        { cancelable: true },
                                    );
                                })
                            } else {
                                db.collection("teams").doc(querySnapshot.docs[0].id).update({ members: firebase.firestore.FieldValue.arrayUnion(state.memberName) })
                                // querySnapshot.data.forEach((doc) => {
                                //     // Build doc ref from doc.id
                                //     let members = doc.members;
                                //     console.log(doc)
                                //     console.log(members)
                                //     members.push(state.memberName);
                                //     db.collection("teams").doc(doc.id).update({ members: members });
                                // });
                            }

                        })

                }
            })

        // db.collection("teams").add({
        //     teamName: this.state.teamName,
        //     members: [this.state.memberName],
        // }).then((result) => {
        //     console.log('********8')
        //     console.log(result)
        // })
        // this.setState({ addMembers: true })
    }

    checkTeam() {
        let state = this.state
        let props = this.props
        db.collection("teams").where("teamName", "==", state.teamName)
            .get()
            .then(function (querySnapshot) {
                if (querySnapshot.empty) {
                    Alert.alert(
                        'Team doesnt exist',
                        'Please check team name',
                        [

                        ],
                        { cancelable: true },
                    );
                } else {

                    querySnapshot.docs.forEach((doc) => {
                        // Build doc ref from doc.id
                        console.log(doc)
                        let members = doc.data().members;
                        let found = false;
                        members.forEach((member) => {
                            if (member == state.userName) {
                                found = true;
                            }
                        })
                        if (found) {
                            // props.navigation.navigate('TasksScreen', { teamName: state.teamName })
                            props.updateTeamName(state.teamName)
                            props.navigation.navigate('TasksScreen')
                        }
                    });
                }
            })
    }

    updateTeam() {
        db.collection("teams").where("teamName", "==", this.state.teamName)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach((doc) => {
                    // Build doc ref from doc.id
                    let members = doc.members;
                    console.log('+++++++++++')
                    console.log(members)
                    members.push(this.state.userName);
                    db.collection("teams").doc(doc.id).update({ members: members });
                });
            })
    }

    toggleSignIn() {
        this.setState({
            isNewUser: !this.state.isNewUser
        })
    }

}

function mapStateToProps(state) {
    return {
        //add mappers here
        teamName: state.Session.teamName
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateTeamName: (teamName) => dispatch({ type: 'SHARE_TEAMNAME', teamName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)

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
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    logo: {},
    logoText: {
        color: 'white',
        fontSize: 50,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.5,
    },
    userName: {
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
        textAlign: 'center',
        width: WIDTH - 100,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: 'rgba(32, 76, 31, 0.5)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25,
    },
    inputa: {
        textAlign: 'center',
        borderRadius: 20,
        marginTop: 10,
        width: WIDTH - 100,
        height: 45,
        borderColor: 'white',
        borderWidth: 1,
        fontSize: 16,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25,
    },
    inputIcon: {
        position: 'absolute',
        top: 10,
        left: 37,
    },
    btn: {
        width: 140,
        height: 35,
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
    submitText: {
        marginTop: 25,
        color: 'rgba(7, 243, 125, 0.8)',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    workContainer: {
        paddingBottom: 20,
        paddingTop: 20,
        height: 290,
        width: WIDTH - 65,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
    },
    workAreaHeading: {
        marginBottom: 20,
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 22,
        textAlign: 'center',
    }
});

