import { createStackNavigator, createNavigationContainer, createSwitchNavigator } from 'react-navigation';

import bottomNav from './BottomTabNavigator';
import loginScreen from '../screens/LoginScreen';
import homeScreen from '../screens/HomeScreen'
import mainScreen from '../screens/MainScreen'

import { fromRight } from 'react-navigation-transitions';

const onboardingNavigator = createStackNavigator(
    {
        LoginScreen: { screen: loginScreen },
        HomeScreen: { screen: homeScreen },
        MainScreen: { screen: mainScreen }
    },
    {
        initialRouteName: 'LoginScreen',
        headerMode: 'none',
        transitionConfig: () => fromRight()
    }
);

const mainModalNavigator = createStackNavigator(
    {
        TasksScreen: { screen: bottomNav },
    }, {
    cardStyle: {
        backgroundColor: 'transparent',
        opacity: 1
    },
}
);

const RootNavigator = createSwitchNavigator(
    {
        OnboardingNavigator: { screen: onboardingNavigator },
        MainModalNavigator: { screen: mainModalNavigator },
    },
    {
        initialRouteName: 'OnboardingNavigator',
        transitionConfig: () => fromRight()
    }
);

export default createNavigationContainer(RootNavigator)


