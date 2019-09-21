import {
    StyleSheet,
    Platform,
    Dimensions,
} from 'react-native';

import { Header } from 'react-navigation';
import { StatusBar } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default {
    primaryColor: '#000000', //Black
    primaryOnColor: '#FFFFFF', //Colors for text and icons ontop of primary
    secondaryColor: '#1dbf73', //Green 
    secondaryOnColor: '#FFFFFF', //Colors for text and icons ontop of primary
    transparentColor: 'rgba(0, 0, 0, 0)',
    modalOverlayColor: 'rgba(0,0,0,0.5)',
    darkGreen: '#006400',
    validationPassColor: '#4cd58a',
    validationFailColor: '#f43636',
    androidStatusBarPadding: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,

    globalStyles: StyleSheet.create({
        imageBackgroundContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            color: this.primaryColor,
            backgroundColor: this.primaryColor
        },
        imageBackgroundContainerStretch: {
            flex: 1,
            alignItems: 'stretch',
            color: this.primaryColor,
            backgroundColor: '#000'
        },
        scrollView: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            width: screenWidth,
            flex: 1,
            paddingVertical: 50,
        },
        //Container that takes into account the header from stack
        //And bottom tab navigator (Places margin for these)
        bottomTabHeaderContainer: {
            flex: 1,
            // marginTop: Header.HEIGHT,
            // marginBottom: Header.HEIGHT,
            alignItems: 'center',
        },

        headerContainer: {
            flex: 1,
            // marginTop: Header.HEIGHT,
            alignItems: 'center',
        }

    })

}