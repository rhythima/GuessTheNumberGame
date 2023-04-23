import React from 'react'
import {View,Text,StyleSheet, PlatformColor} from 'react-native';
import color from '../constants/color';

const Header = props =>{
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    header:{
        width:'100%',
        height:90,
        paddingTop:36,
        backgroundColor:PlatformColor.OS == 'android'?'#fff':color.primary,
        alignItems:'center',
        justifyContent:'center'
    },
    headerTitle:{
        color:'black',
        fontSize:18,
        fontFamily:'open-sans-bold'
    }


})

export default Header