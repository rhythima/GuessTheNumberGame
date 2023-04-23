import React,{useState} from 'react';
import { StyleSheet,View } from 'react-native';
import Header from './components/Header';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';
import * as Font from 'expo-font'
import { AppLoading } from 'expo';

const fetchFonts = () =>{
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf'),

  })
}


function App() {
 
  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setguessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false);


  if(!dataLoaded){
    return <AppLoading 
    startAsync={fetchFonts} 
    onFinish={()=>setDataLoaded(true)}
    onError={(err)=>console.log(err)} />
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber)
  }
  const gameOverHandler = numOfRounds =>{
    setguessRounds(numOfRounds)
  }

  const restartHandler = () =>{
    setguessRounds(0);
    setUserNumber(null)
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>
  if(userNumber && guessRounds<=0){
    content=<GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  }else if(userNumber && guessRounds>0){
    content = <GameOverScreen numOfRounds={guessRounds} userNumber={userNumber} onRestart={restartHandler}/>
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"/>
      {content}
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
});
