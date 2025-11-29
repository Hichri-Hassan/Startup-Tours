import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

const HomeScreen = ({navigation}) => {
  const games = [
    {id: 1, title: 'Question/Réponse', emoji: '❓', color: '#6B46C1'},
    {id: 2, title: 'Devinettes', emoji: '🤔', color: '#3182CE'},
    {id: 3, title: 'Vérité ou Action', emoji: '🎲', color: '#DD6B20'},
    {id: 4, title: 'Quiz Personnalité', emoji: '🧠', color: '#38A169'},
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MeetMe Game</Text>
        <Text style={styles.subtitle}>Choisis un jeu pour commencer !</Text>
      </View>

      <View style={styles.gamesContainer}>
        {games.map(game => (
          <TouchableOpacity
            key={game.id}
            style={[styles.gameCard, {backgroundColor: game.color}]}
            onPress={() => navigation.navigate('Game', {gameId: game.id})}>
            <Text style={styles.gameEmoji}>{game.emoji}</Text>
            <Text style={styles.gameTitle}>{game.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tes matches récents</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            Commence à jouer pour rencontrer de nouvelles personnes !
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6B46C1',
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    marginTop: 5,
  },
  gamesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  gameCard: {
    width: '47%',
    aspectRatio: 1,
    margin: '1.5%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gameEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  gameTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2D3748',
  },
  emptyState: {
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    color: '#A0AEC0',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default HomeScreen;
