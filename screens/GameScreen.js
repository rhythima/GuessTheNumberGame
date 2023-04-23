import React,{useState,useRef, useEffect} from 'react'
import { Button, StyleSheet,View,Text, Alert, ScrollView, Dimensions } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import BodyText from '../components/BodyText';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton'

const generateRandomBetween = (min,max,exclude) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min
    if(rndNum === exclude){
        return generateRandomBetween(min,max,exclude)
    }else{
        return rndNum;
    }
}

const renderListItem = (value,numOfRounds) =>{
  return ( <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRounds}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
  )
}


const GameScreen = props =>{
    const initialGuess = generateRandomBetween(1,99,props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuess, setpassGuess] = useState([initialGuess])

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice,onGameOver} = props

    useEffect(()=>{
        if(currentGuess == props.userChoice){
            onGameOver(pastGuess.length)
        }
    },[userChoice,currentGuess,onGameOver])

    const nextGameHandler = direction =>{

        if((direction === 'lower' && currentGuess<props.userChoice) || (direction === 'greater' && currentGuess>props.userChoice)){
            Alert.alert("Don\'t lie", 'You know that is wrong...',[{text:'Sorry !',style:'cancel'}])
            return;
        }
        if(direction === 'lower'){
            currentHigh.current = currentGuess
        }else{
            currentLow.current = currentGuess +1
        }
        const nextNumber = generateRandomBetween(currentLow.current,currentHigh.current,currentGuess)
        setCurrentGuess(nextNumber);
        // setNumofRounds(prev => prev + 1)
        setpassGuess(currentPassGuess => [nextNumber,...currentPassGuess])
    }

    if(Dimensions.get('window').height < 500){

        return (
            <View style={styles.screen}> 
            <BodyText>Opponent's Guess</BodyText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.btnContainer}>
                <MainButton  onPress={()=>nextGameHandler('lower')}><Ionicons name="md-remove" size={24} color="white"/></MainButton>
                <MainButton  onPress={()=>nextGameHandler('greater')}><Ionicons name="md-add" size={24} color="white"/></MainButton>
            </Card>
            <View style={styles.listContainer}>
            <ScrollView contentContainerStyle={styles.list}>
            {pastGuess.map((guess,index) => renderListItem(guess,pastGuess.length - index ))}
            </ScrollView>
            </View>
            </View>            
        )
    }

    return (
        <View style={styles.screen}> 
            <BodyText>Opponent's Guess</BodyText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.btnContainer}>
                <MainButton  onPress={()=>nextGameHandler('lower')}><Ionicons name="md-remove" size={24} color="white"/></MainButton>
                <MainButton  onPress={()=>nextGameHandler('greater')}><Ionicons name="md-add" size={24} color="white"/></MainButton>
            </Card>
            <View style={styles.listContainer}>
            <ScrollView contentContainerStyle={styles.list}>
            {pastGuess.map((guess,index) => renderListItem(guess,pastGuess.length - index ))}
            </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    btnContainer:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:Dimensions.get('window').height > 600 ? 20 :5,
        width:400,
        maxWidth:'90%'
    },
    listItem:{
    borderColor:'#ccc',
    borderWidth:1,
    padding:15,
    marginVertical:10,
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-around',
    width:'60%'
    },
    listContainer:{
        flex:1,
        // width:'80%'
        width: Dimensions.get('window').width > 350 ? '100%' :'80%'
    },
    list:{
        flexGrow:1,
        alignItems:'center',
        justifyContent:'flex-end'
    }
})

export default GameScreen