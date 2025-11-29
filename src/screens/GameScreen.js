import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';

const GameScreen = ({route, navigation}) => {
  const {gameId} = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  // Questions d'exemple
  const questions = [
    {
      id: 1,
      question: 'Quelle est ta saison préférée ?',
      options: ['Printemps', 'Été', 'Automne', 'Hiver'],
    },
    {
      id: 2,
      question: 'Préfères-tu...',
      options: ['Sortir en soirée', 'Rester chez soi', 'Les deux !', 'Ça dépend'],
    },
    {
      id: 3,
      question: 'Ton animal préféré ?',
      options: ['Chien', 'Chat', 'Oiseau', 'Autre'],
    },
  ];

  const handleAnswer = answer => {
    console.log('Answer selected:', answer);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setScore(score + 1);
    } else {
      // Fin du jeu
      navigation.navigate('GameResult', {score: score + 1, total: questions.length});
    }
  };

  const question = questions[currentQuestion];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progress}>
          Question {currentQuestion + 1} / {questions.length}
        </Text>
        <Text style={styles.score}>Score: {score}</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>{question.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(option)}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.skipText}>Quitter le jeu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B46C1',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  progress: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B46C1',
  },
  skipButton: {
    alignItems: 'center',
    padding: 10,
  },
  skipText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default GameScreen;
