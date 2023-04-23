import React from 'react'
import {View,Text,StyleSheet, Button, Image, Dimensions, ScrollView} from 'react-native'
import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton'
import color from '../constants/color'

const GameOverScreen = props =>{

    return (
        <ScrollView>
        <View style={styles.screen}>
    <BodyText style={styles.font}>The Game is Over!!!</BodyText>
    <View style={styles.imgContainer}>
    <Image 
    source={require('../assets/success.png')}
    style={styles.image} resizeMode="cover"/>
    </View>
    <View style={styles.resultContainer}>
    <BodyText style={styles.resultContainer}>Your phone needed <Text style={styles.highlight}>{props.numOfRounds}</Text> rounds to guess the number... <Text style={styles.highlight}>{props.userNumber}</Text> </BodyText>
    <MainButton onPress={()=>{props.onRestart()}}>NEW GAME</MainButton>
        </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:'100%',
        height:'100%',
    },
    imgContainer:{
        borderRadius:Dimensions.get('window').width * 0.7/2,
        borderWidth:3,
        borderColor:'black',
        width:Dimensions.get('window').width * 0.7,
        height:Dimensions.get('window').width * 0.7,
        overflow:'hidden',
        marginVertical:Dimensions.get('window').height/30
    },
    resultContainer:{
        marginHorizontal:Dimensions.get('window').height/60,
        marginVertical:20
    },
    highlight:{
        color:color.primary,
        fontFamily:"open-sans-bold"

    },
    resultText:{
        color:color.primary,
        fontSize:Dimensions.get('window').height < 400 ? 16 : 20
    },
    userNumberState:{
        justifyContent:'center',
        alignItems:'center'
    },
    font:{
        marginTop: Dimensions.get('window').height > 200 ? 60 : 10,
        fontWeight:'bold',
        fontSize:18
    }
})

export default GameOverScreen