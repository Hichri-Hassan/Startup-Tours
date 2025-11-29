import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MeetMe Game 🎮</Text>
      <Text style={styles.subtitle}>
        Rencontrez de nouvelles personnes à travers des jeux amusants
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.buttonText, styles.secondaryText]}>
            S'inscrire
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Faites des rencontres amicales ou amoureuses en jouant !
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6B46C1',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: '#4A5568',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#6B46C1',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#6B46C1',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  secondaryText: {
    color: '#6B46C1',
  },
  footerText: {
    marginTop: 40,
    fontSize: 14,
    color: '#A0AEC0',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
