import React, { useState,useEffect } from 'react'
import { StyleSheet,View,Text, TextInput, Button,TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native'
import BodyText from '../components/BodyText'
import Card from '../components/Card'
import Input from '../components/Input'
import MainButton from '../components/MainButton'
import NumberContainer from '../components/NumberContainer'
import color from '../constants/color'

const StartGameScreen = props =>{
    const [enteredValue,setEnteredValue] = useState('')
    const [confirmed,setConfirmed] = useState(false)
    const [selectedNumber,setSelectedNumber] = useState()
    const [buttonWidth ,setButtonWidth] = useState(Dimensions.get('window').width /4)


    useEffect(()=>{
        const updateLayout = () =>{
            setButtonWidth(Dimensions.get('screen').width / 4)
        }
    
        Dimensions.addEventListener('change',updateLayout)
        return ()=>{
        Dimensions.removeEventListener('change',updateLayout)
        }
    })


    const numberInputHandler = inputText =>{
        setEnteredValue(inputText.replace(/[^0-9]/g,''))
    }

    const resetInputHandler = () =>{
        setEnteredValue('');
        setConfirmed(false)
    }

    const confirmInputHandler = ()=>{

        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber>=99){
            Alert.alert('Invalid Message','Number has to be number between 1 to  99',[{text:'Okay',style:'destructive',onPress:resetInputHandler}])
            return
        }
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('');
        Keyboard.dismiss()
    }


    let confirmedOutput;
    if(confirmed){
    confirmedOutput=<Card style={styles.summaryContainer}>
        <BodyText>You Selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        {/* <Button title="START GAME" onPress={()=>props.onStartGame(selectedNumber)}/> */}
        <MainButton onPress={()=>props.onStartGame(selectedNumber)}>START GAME</MainButton>
        </Card>
    }

    return (
        <ScrollView>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game !</Text>
            <View>
            <Card style={styles.inputContainer}>
            <BodyText>Select a Number!</BodyText>
            <Input style={styles.input} 
            blurOnSubmit 
            autoCapitalize="none" 
            autoCorrect={false} 
            keyboardType="number-pad" 
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}/>

            <View style={styles.buttonContainer}>
    
                <View style={{width:buttonWidth}}><Button title="Reset" onPress={resetInputHandler} color={color.primary}/></View>
                <View style={{width:buttonWidth}}><Button title="Confirm" onPress={confirmInputHandler} color={color.accent}/></View>
            </View>
            </Card>
            <View style={styles.confirm}>
            {confirmedOutput}
            </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    )

}

const styles = StyleSheet.create({

    screen:{
        flex:1,
        padding:10,
        alignItems:'center',
    },
    buttonContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-evenly',
        paddingHorizontal:15,
    },
    inputContainer:{
        width:'80%',
        // maxWidth:'80%',
        minWidth:300,
        maxWidth:'95%',
        alignItems:'center'
    },
    title:{
        fontSize:20,
        marginVertical:10,
        fontFamily:'open-sans-bold'
    },
    // button:{
    //     flex:1,
    //     // width:100,
    //     width:Dimensions.get('window').width/4,
    //     justifyContent:'center',
    //     alignItems:'center'
    // },
    input:{
        width:50,
        textAlign:"center"
    },
    confirm:{
        alignItems:'center',
        justifyContent:'center'
    },
    summaryContainer:{
        marginTop:20,
        alignItems:'center'
    }
})

export default StartGameScreen