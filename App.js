import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import ScanScreen from './src/screens/ScanScreen';
import DataEntryScreen from './src/screens/DataEntryScreen';
import WaitingScreen from './src/screens/WaitingScreen';
import GroupAssignmentScreen from './src/screens/GroupAssignmentScreen';
import QuestionScreen from './src/screens/QuestionScreen';
import GuessWhoScreen from './src/screens/GuessWhoScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('scan');
  const [userData, setUserData] = useState({
    name: '',
    mood: '',
    intention: '',
    age: '',
    lookingFor: '',
  });
  const [groupMembers, setGroupMembers] = useState([]);

  const handleScanComplete = () => {
    setCurrentScreen('entry');
  };

  const handleDataSubmit = data => {
    setUserData(data);
    setCurrentScreen('waiting');
  };

  const handleMatchFound = () => {
    // Générer les membres du groupe selon l'intention
    if (userData.intention === 'romance') {
      setGroupMembers(['Julie']);
    } else {
      setGroupMembers(['Julie', 'Marc', 'Sarah']);
    }
    setCurrentScreen('group');
  };

  const handleStartSession = () => {
    // Si c'est romance, on va vers le jeu "devine qui"
    if (userData.intention === 'romance') {
      setCurrentScreen('guesswho');
    } else {
      // Sinon vers les questions/jeux pour amis
      setCurrentScreen('questions');
    }
  };

  const handleBackToScan = () => {
    setCurrentScreen('scan');
    setUserData({name: '', mood: '', intention: '', age: '', lookingFor: ''});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        {currentScreen === 'scan' && (
          <ScanScreen onScanComplete={handleScanComplete} />
        )}
        {currentScreen === 'entry' && (
          <DataEntryScreen onSubmit={handleDataSubmit} />
        )}
        {currentScreen === 'waiting' && (
          <WaitingScreen
            onMatchFound={handleMatchFound}
            intention={userData.intention}
          />
        )}
        {currentScreen === 'group' && (
          <GroupAssignmentScreen
            onStartSession={handleStartSession}
            userName={userData.name}
            intention={userData.intention}
          />
        )}
        {currentScreen === 'questions' && (
          <QuestionScreen
            onReset={handleBackToScan}
            groupMembers={groupMembers}
          />
        )}
        {currentScreen === 'guesswho' && (
          <GuessWhoScreen
            onReset={handleBackToScan}
            groupMembers={groupMembers}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
});

export default App;
