import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import ScanScreen from './src/screens/ScanScreen';
import DataEntryScreen from './src/screens/DataEntryScreen';
import WaitingScreen from './src/screens/WaitingScreen';
import GroupAssignmentScreen from './src/screens/GroupAssignmentScreen';
import QuestionScreen from './src/screens/QuestionScreen';
import GuessWhoScreen from './src/screens/GuessWhoScreen';
import ChallengeScreen from './src/screens/ChallengeScreen';

const App = () => {
    const [currentScreen, setCurrentScreen] = useState('home');
    const [userData, setUserData] = useState({
        name: '',
        mood: '',
        intention: '',
        age: '',
        lookingFor: '',
    });
    const [groupMembers, setGroupMembers] = useState([]);

    const handleOpenScanner = () => {
        setCurrentScreen('scan');
    };

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
        setCurrentScreen('home');
        setUserData({ name: '', mood: '', intention: '', age: '', lookingFor: '' });
    };

    const handleStartChallenge = () => {
        setCurrentScreen('challenge');
    };

    const handleBackToQuestions = () => {
        setCurrentScreen('questions');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.content}>
                {currentScreen === 'home' && (
                    <HomeScreen onScanPress={handleOpenScanner} />
                )}
                {currentScreen === 'scan' && (
                    <ScanScreen
                        onScanComplete={handleScanComplete}
                        onBack={() => setCurrentScreen('home')}
                    />
                )}
                {currentScreen === 'entry' && (
                    <DataEntryScreen 
                        onSubmit={handleDataSubmit}
                        onBack={() => setCurrentScreen('scan')}
                    />
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
                        onStartChallenge={handleStartChallenge}
                    />
                )}
                {currentScreen === 'guesswho' && (
                    <GuessWhoScreen
                        onReset={handleBackToScan}
                        groupMembers={groupMembers}
                    />
                )}
                {currentScreen === 'challenge' && (
                    <ChallengeScreen onBack={handleBackToQuestions} />
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
