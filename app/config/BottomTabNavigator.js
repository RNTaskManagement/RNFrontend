import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

//import screens
import openTasksScreen from '../screens/OpenTasksScreen';
import completeTasksScreen from '../screens/CompleteTasksScreen';
import homeScreen from '../screens/HomeScreen';
import inProgressTasksScreen from '../screens/InprogressTasksScreen';
//import Icon from 'react-native-vector-icons/MaterialIcons'
import Styles from '../config/styles';

const bottomNav = createBottomTabNavigator(
  {
    Open: {
      screen: openTasksScreen,
      navigationOptions: {
        tabBarLabel: () => {
          return null;
        },
        tabBarIcon: ({ tintColor }) => {
          return <Text style={styles.text}> Open </Text>;
          // return <Icon name={'add-circle'} size={25} color={tintColor} />
        },
      },
    },
    InProgress: {
      screen: inProgressTasksScreen,
      navigationOptions: {
        tabBarLabel: () => {
          return null;
        },
        tabBarIcon: ({ tintColor }) => {
          return <Text style={styles.text}> In Progress </Text>;
          // return <Icon name={'add-circle'} size={25} color={tintColor} />
        },
      },
    },
    Complete: {
      screen: completeTasksScreen,
      navigationOptions: {
        tabBarLabel: () => {
          return null;
        },
        tabBarIcon: ({ tintColor }) => {
          return <Text style={styles.text}> Complete </Text>;
          // return <Icon name={'add-circle'} size={25} color={tintColor} />
        },
      },
    },
  },
  {
    initialRouteName: 'Open',
    tabBarOptions: {
      activeTintColor: Styles.secondaryColor,
      inactiveTintColor: Styles.primaryOnColor,
      style: {
        backgroundColor: Styles.primaryColor,
        borderTopWidth: 1,
        borderTopColor: Styles.primaryOnColor,
      },
    },
    navigationOptions: {},
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
        <Text>Hello</Text>
      </View>
    ),
    headerLeft: null,
    headerRight: null,
    headerStyle: {
      backgroundColor: Styles.primaryColor,
      borderBottomWidth: 1,
      borderBottomColor: Styles.primaryOnColor,
    },
  };
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    // flex: 1,
    width: 30,
    height: 30,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default bottomNav;
