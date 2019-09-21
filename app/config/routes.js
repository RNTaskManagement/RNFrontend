import { createStackNavigator, createNavigationContainer, createSwitchNavigator } from 'react-navigation';

import mainScreen from './BottomTabNavigator';
import loginScreen from '../screens/LoginScreen';

import { fromRight } from 'react-navigation-transitions';

const onboardingNavigator = createStackNavigator(
    {
        LoginScreen: { screen: loginScreen },
    },
    {
        initialRouteName: 'LoginScreen',
        headerMode: 'none',
        transitionConfig: () => fromRight()
    }
);

const mainModalNavigator = createStackNavigator(
    {
        MainScreen: mainScreen,
    }, {
    mode: 'modal',
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


