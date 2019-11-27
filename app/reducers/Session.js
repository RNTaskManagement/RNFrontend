
import { API_NAME, API_USER_POST, API_USER_GET, API_FORM } from '../config/Constants'
import { store } from '../components/App'
import User from '../models/User'


const initialState = {
    teamName: '',
    taskDetails: {}
}

// const firebase = require('firebase');
// var db;

const USER_POST_REQUEST = 'POST_USER_REQUEST';

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        //example
        case USER_POST_REQUEST:
            return { ...state, userPost: { ...state.userPost, isFetching: true, result: '', success: false } };
        case 'SHARE_TEAMNAME':
            return { ...state, teamName: action.teamName }
        case 'UPDATE_TASK_STATUS':
            console.log(action.taskDetails)

            return { ...state, taskStatus: action.taskDetails }
        default:
            return state;
    }
}

const SIGN_IN_AND_GET_SUCCESS = 'SIGN_IN_AND_GET_SUCCESS';
//Used when user enters email and password in LoginScreen.js
export function signInUser(email, password) {

    //example here
    console.log('In sign in user!');
    return function (dispatch) {
        console.log('Dispatching to sign in request');
        dispatch(signInRequest()); //Change state to loading
        return Auth.signIn({
            username: email.toLowerCase(),
            password
        }).then(data => {
            myInit = { body: { _id: data.username } }
            //Once the user signs in, check if user exists in the cloud
            return API.post(API_NAME, API_USER_GET, myInit).then(response => {
                if (response.statusCode == 400) { //we did not find in cloud
                    console.log("We didn't find it in cloud: " + myInit._id)
                    dispatch(signInSuccess(data)); //store the stuff from cognito
                }
                else { //It is in cloud, update locally and store stuff from cognito and database
                    dispatch({ type: SIGN_IN_AND_GET_SUCCESS, user: response.body });
                }
            }).catch(error => {
                console.log("Error retrieving document")
                dispatch(signInSuccess(data));
            });


        }).catch(err => dispatch(signInFail(err.message)));
    }
}

//get data from local storage
// const USER_ASYNC_STORAGE_KEY = 'USER_ASYNC_STORAGE_KEY';
// //Get data from 
// getAsyncStorageUser = async () => {
//     try {
//         const value = await AsyncStorage.getItem(USER_ASYNC_STORAGE_KEY)
//         if (value !== null) {
//             console.log('Async storage user: ' + value);
//             return JSON.parse(value);
//         }
//     } catch (e) { //Error from async storage, return null
//         return null;
//     }
// }

//storing data locally
// storeAsyncStorageUser = async (user) => {
//     try {
//         await AsyncStorage.setItem(USER_ASYNC_STORAGE_KEY, JSON.stringify(user))
//         console.log('Async storage: USER stored successfully');
//     }
//     catch (e) {
//         console.log('Storing data doesnt work');
//         //Do nothing if it doesn't work. 
//     }
// }



//user get example 
// const USER_GET_REQUEST = 'USER_GET_REQUEST';
// const USER_GET_FAIL = 'USER_GET_FAIL';
// const USER_GET_SUCCESS = 'USER_GET_SUCCESS'
// export function userGet(_id) {
//     return async function (dispatch) {
//         dispatch({ type: USER_GET_REQUEST });

//         var user = getAsyncStorageUser();
//         if (user != null) { //User is in local storage, then no need to grab from cloud
//             dispatch({ type: USER_GET_SUCCESS, user });
//             return;
//         }
//         try {
//             myInit = { _id: _id }
//             var response = await API.post(API_NAME, API_USER_GET, myInit);
//             if (response.statusCode == 400) {
//                 dispatch({ type: USER_GET_FAIL, result: response.message });
//             }
//             else {
//                 var user = JSON.parse(response.body); //Parse user object from response body
//                 await storeAsyncStorageUser(user); //Store user object into AsyncStorage
//                 dispatch({ type: USER_GET_SUCCESS, user });
//             }
//         } catch (error) {
//             dispatch({ type: USER_GET_FAIL, result: error.message });
//         }
//     }
// }




export default Reducer;