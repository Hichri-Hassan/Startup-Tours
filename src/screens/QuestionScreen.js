import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';

const questions = [
  'Tu es plutôt extraverti ou observateur ?',
  'Quel est ton endroit préféré pour sortir ?',
  'Un talent caché que personne ne connaît ?',
  'Ta playlist idéale pour une soirée ?',
  'Plutôt aventure spontanée ou soirée planifiée ?',
  'Le dernier truc qui t\'a fait rire aux larmes ?',
  'Si tu pouvais voyager n\'importe où, ce serait où ?',
  'Ton film ou série comfort food ?',
];

const boardGames = [
  {
    name: "Time's Up",
    description:
      'Faites deviner des personnalités en 3 manches : description, un seul mot, mime !',
    icon: '🎭',
  },
  {
    name: 'Just One',
    description:
      'Donnez des indices pour faire deviner un mot, mais attention aux doublons !',
    icon: '💭',
  },
  {
    name: 'Limite Limite',
    description:
      'Complétez des phrases avec les cartes les plus drôles ou décalées !',
    icon: '😈',
  },
  {
    name: 'Story Cubes',
    description:
      'Lancez les dés et inventez une histoire avec les symboles obtenus !',
    icon: '🎲',
  },
  {
    name: 'Blanc Manger Coco',
    description: 'Le jeu de cartes pour les esprits tordus et l\'humour noir !',
    icon: '🃏',
  },
];

const QuestionScreen = ({onReset, groupMembers}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showGroupChange, setShowGroupChange] = useState(false);
  const [activityType, setActivityType] = useState(
    Math.random() > 0.5 ? 'questions' : 'game',
  );
  const [currentGame, setCurrentGame] = useState(
    Math.floor(Math.random() * boardGames.length),
  );
  const [showExitModal, setShowExitModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(12 * 60);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (newClickCount % 5 === 0) {
      setShowGroupChange(true);
      return;
    }

    const random = Math.random();
    if (random > 0.5) {
      setActivityType('questions');
      const randomQuestion = Math.floor(Math.random() * questions.length);
      setCurrentQuestion(randomQuestion);
    } else {
      setActivityType('game');
      const randomGame = Math.floor(Math.random() * boardGames.length);
      setCurrentGame(randomGame);
    }
  };

  const handleContinueAfterChange = () => {
    setShowGroupChange(false);
    setTimeRemaining(12 * 60);
    const random = Math.random();
    if (random > 0.5) {
      setActivityType('game');
      setCurrentGame(Math.floor(Math.random() * boardGames.length));
    } else {
      setActivityType('questions');
      setCurrentQuestion(Math.floor(Math.random() * questions.length));
    }
  };

  if (showGroupChange) {
    return (
      <View style={styles.container}>
        <View style={styles.changeContainer}>
          <View style={styles.changeIcon}>
            <Text style={styles.changeIconText}>🔄</Text>
          </View>

          <Text style={styles.changeTitle}>Changement de groupe !</Text>
          <Text style={styles.changeSubtitle}>
            Tu vas être réassigné pour rencontrer d'autres personnes
          </Text>

          <View style={styles.newGroupCard}>
            <Text style={styles.newGroupText}>Nouveau groupe : Groupe 5</Text>
            <View style={styles.newGroupAvatars}>
              {['L', 'M', 'P'].map((initial, i) => (
                <View key={initial} style={styles.newGroupAvatar}>
                  <Text style={styles.newGroupAvatarText}>{initial}</Text>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinueAfterChange}
            activeOpacity={0.8}>
            <Text style={styles.continueButtonText}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.timerContainer}>
          <Text style={styles.timerIcon}>⏱️</Text>
          <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
        </View>

        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => setShowExitModal(true)}>
          <Text style={styles.exitIcon}>🚪</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {activityType === 'questions' ? (
          <View style={styles.activityContainer}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>💬</Text>
            </View>
            <Text style={styles.activityTitle}>Question du moment</Text>
            <View style={styles.questionCard}>
              <Text style={styles.questionText}>
                {questions[currentQuestion]}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.activityContainer}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>
                {boardGames[currentGame].icon}
              </Text>
            </View>
            <Text style={styles.activityTitle}>Jeu de société</Text>
            <View style={styles.gameCard}>
              <Text style={styles.gameName}>{boardGames[currentGame].name}</Text>
              <Text style={styles.gameDescription}>
                {boardGames[currentGame].description}
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.8}>
          <Text style={styles.nextButtonText}>Question/Jeu suivant</Text>
          <Text style={styles.nextButtonIcon}>→</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Exit Modal */}
      <Modal
        visible={showExitModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowExitModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalIcon}>⚠️</Text>
            <Text style={styles.modalTitle}>Quitter la session ?</Text>
            <Text style={styles.modalText}>
              Tu es sûr de vouloir quitter ? Tu perdras ta place dans le groupe.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setShowExitModal(false)}>
                <Text style={styles.modalButtonCancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonConfirm}
                onPress={onReset}>
                <Text style={styles.modalButtonConfirmText}>Quitter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 12,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2eded',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  timerIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  exitButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f2eded',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitIcon: {
    fontSize: 20,
  },
  content: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 0,
  },
  activityContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  activityIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#f2eded',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIconText: {
    fontSize: 40,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c12ec4',
    marginBottom: 24,
  },
  questionCard: {
    backgroundColor: '#f2eded',
    borderRadius: 24,
    padding: 32,
    width: '100%',
  },
  questionText: {
    fontSize: 22,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 32,
  },
  gameCard: {
    backgroundColor: '#f2eded',
    borderRadius: 24,
    padding: 24,
    width: '100%',
  },
  gameName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c12ec4',
    marginBottom: 12,
    textAlign: 'center',
  },
  gameDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  nextButton: {
    backgroundColor: '#e1a3ff',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  nextButtonIcon: {
    color: '#ffffff',
    fontSize: 20,
  },
  changeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  changeIcon: {
    width: 96,
    height: 96,
    backgroundColor: '#e1a3ff',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  changeIconText: {
    fontSize: 48,
  },
  changeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c12ec4',
    marginBottom: 8,
  },
  changeSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  newGroupCard: {
    backgroundColor: '#f2eded',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    marginBottom: 32,
    alignItems: 'center',
  },
  newGroupText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  newGroupAvatars: {
    flexDirection: 'row',
    gap: 8,
  },
  newGroupAvatar: {
    width: 48,
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newGroupAvatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#c12ec4',
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#e1a3ff',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  modalIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalButtonCancel: {
    flex: 1,
    backgroundColor: '#f2eded',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonCancelText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  modalButtonConfirm: {
    flex: 1,
    backgroundColor: '#EF4444',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonConfirmText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QuestionScreen;
