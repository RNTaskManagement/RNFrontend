import React from 'react';
import { StyleSheet, Image, View } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation';

//import screens
import homeScreen from '../screens/HomeScreen';

import Icon from '../../node_modules/react-native-vector-icons/FontAwesome.js'
import Styles from '../config/styles';


const bottomNav = createBottomTabNavigator(
    {
        HomeScreen: {
            screen: homeScreen,
            navigationOptions: {
                tabBarLabel: () => { return null },
                tabBarIcon: ({ tintColor }) => {
                    console.log(tintColor);
                    return <Icon name={'line-chart'} size={25} color={tintColor} />
                }
            }
        },
    },
    {
        initialRouteName: "HomeScreen",
        tabBarOptions: {
            activeTintColor: Styles.secondaryColor,
            inactiveTintColor: Styles.primaryOnColor,
            style: {
                backgroundColor: Styles.primaryColor,
                borderTopWidth: 1,
                borderTopColor: Styles.primaryOnColor
            },
        },
        navigationOptions: {

        },
        animationEnabled: true,
    },

);

bottomNav.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    // You can do whatever you like here to pick the title based on the route name
    // const headerTitle = routeName;

    return {
        //   title: headerTitle,
        // header: null,
        headerTitle: (
            <View style={styles.headerContainer}>
                <Image
                    style={styles.logo}
                    source={logo} />
            </View>
        ),
        headerLeft: null,
        headerRight: null,
        headerStyle: {
            justifyContent: 'center',
            backgroundColor: Styles.primaryColor,
            borderBottomWidth: 1,
            borderBottomColor: Styles.primaryOnColor
        },
    };
}



const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        // flex: 1,
        width: 30,
        height: 30,
    }
});

export default bottomNav