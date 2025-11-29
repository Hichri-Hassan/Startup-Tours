import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';

const challenges = [
  'Un pingouin qui danse',
  'Quelqu\'un qui fait du yoga',
  'Un chef cuisinier stressé',
  'Un zombie qui court',
  'Un guitariste rock',
  'Quelqu\'un qui glisse sur une peau de banane',
  'Un magicien raté',
  'Un surfeur sur une vague',
  'Quelqu\'un qui se brosse les dents',
  'Un robot qui bug',
  'Un pirate qui cherche son trésor',
  'Quelqu\'un qui marche sur la lune',
];

const ChallengeScreen = ({onBack}) => {
  const [gameState, setGameState] = useState('ready'); // ready, playing, finished
  const [currentChallenge, setCurrentChallenge] = useState('');
  const [team1Time, setTeam1Time] = useState(60);
  const [team2Time, setTeam2Time] = useState(60);
  const [team1Validated, setTeam1Validated] = useState(false);
  const [team2Validated, setTeam2Validated] = useState(false);
  const [team1FinalTime, setTeam1FinalTime] = useState(null);
  const [team2FinalTime, setTeam2FinalTime] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (gameState === 'ready') {
      // Animation de pulsation pour le bouton start
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        // Timer équipe 1
        if (!team1Validated && team1Time > 0) {
          setTeam1Time(prev => prev - 1);
        }
        // Timer équipe 2
        if (!team2Validated && team2Time > 0) {
          setTeam2Time(prev => prev - 1);
        }

        // Vérifier si le jeu est terminé
        if (
          (team1Validated && team2Validated) ||
          (team1Time <= 0 && team2Time <= 0)
        ) {
          setGameState('finished');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameState, team1Time, team2Time, team1Validated, team2Validated]);

  const handleStart = () => {
    const randomChallenge =
      challenges[Math.floor(Math.random() * challenges.length)];
    setCurrentChallenge(randomChallenge);
    setGameState('playing');
  };

  const handleTeam1Validate = () => {
    if (!team1Validated && team1Time > 0) {
      setTeam1Validated(true);
      setTeam1FinalTime(60 - team1Time);
    }
  };

  const handleTeam2Validate = () => {
    if (!team2Validated && team2Time > 0) {
      setTeam2Validated(true);
      setTeam2FinalTime(60 - team2Time);
    }
  };

  const handleRestart = () => {
    setGameState('ready');
    setTeam1Time(60);
    setTeam2Time(60);
    setTeam1Validated(false);
    setTeam2Validated(false);
    setTeam1FinalTime(null);
    setTeam2FinalTime(null);
    setCurrentChallenge('');
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getWinner = () => {
    if (!team1Validated && !team2Validated) return 'Aucune équipe n\'a trouvé !';
    if (team1Validated && !team2Validated) return 'Équipe 1 gagne ! 🎉';
    if (team2Validated && !team1Validated) return 'Équipe 2 gagne ! 🎉';
    if (team1FinalTime < team2FinalTime) return 'Équipe 1 gagne ! 🎉';
    if (team2FinalTime < team1FinalTime) return 'Équipe 2 gagne ! 🎉';
    return 'Égalité ! 🤝';
  };

  // Écran de démarrage
  if (gameState === 'ready') {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setShowExitModal(true)}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.readyContainer}>
          <Text style={styles.readyTitle}>Défi 2v2</Text>
          <Text style={styles.readySubtitle}>Mime & Devine</Text>

          <View style={styles.rulesCard}>
            <Text style={styles.rulesTitle}>📋 Règles</Text>
            <Text style={styles.rulesText}>
              • 2 équipes de 2 joueurs{'\n'}
              • 1 personne mime, 1 personne devine{'\n'}
              • 1 minute maximum par équipe{'\n'}
              • Cliquez "Validé !" quand trouvé{'\n'}
              • L'équipe la plus rapide gagne ! 🏆
            </Text>
          </View>

          <Animated.View style={{transform: [{scale: pulseAnim}]}}>
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStart}
              activeOpacity={0.8}>
              <Text style={styles.startButtonText}>Commencer le défi</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Modal de sortie */}
        <Modal
          visible={showExitModal}
          transparent={true}
          animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Quitter ?</Text>
              <Text style={styles.modalText}>
                Êtes-vous sûr de vouloir quitter le défi ?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButtonCancel}
                  onPress={() => setShowExitModal(false)}>
                  <Text style={styles.modalButtonCancelText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonConfirm}
                  onPress={onBack}>
                  <Text style={styles.modalButtonConfirmText}>Quitter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // Écran de jeu
  if (gameState === 'playing') {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setShowExitModal(true)}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        {/* Défi à mimer */}
        <View style={styles.challengeCard}>
          <Text style={styles.challengeLabel}>À mimer :</Text>
          <Text style={styles.challengeText}>{currentChallenge}</Text>
        </View>

        {/* Équipe 1 */}
        <View style={styles.teamContainer}>
          <View style={styles.teamHeader}>
            <Text style={styles.teamName}>Équipe 1</Text>
            <View
              style={[
                styles.teamStatus,
                team1Validated && styles.teamStatusSuccess,
              ]}>
              <Text style={styles.teamStatusText}>
                {team1Validated ? '✓ Trouvé !' : 'En cours...'}
              </Text>
            </View>
          </View>

          <View style={styles.timerBox}>
            <Text style={styles.timerText}>{formatTime(team1Time)}</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.validateButton,
              team1Validated && styles.validateButtonDisabled,
            ]}
            onPress={handleTeam1Validate}
            disabled={team1Validated}
            activeOpacity={0.8}>
            <Text style={styles.validateButtonText}>
              {team1Validated ? 'Validé ✓' : 'Validé !'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* VS Separator */}
        <View style={styles.vsSeparator}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        {/* Équipe 2 */}
        <View style={styles.teamContainer}>
          <View style={styles.teamHeader}>
            <Text style={styles.teamName}>Équipe 2</Text>
            <View
              style={[
                styles.teamStatus,
                team2Validated && styles.teamStatusSuccess,
              ]}>
              <Text style={styles.teamStatusText}>
                {team2Validated ? '✓ Trouvé !' : 'En cours...'}
              </Text>
            </View>
          </View>

          <View style={styles.timerBox}>
            <Text style={styles.timerText}>{formatTime(team2Time)}</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.validateButton,
              team2Validated && styles.validateButtonDisabled,
            ]}
            onPress={handleTeam2Validate}
            disabled={team2Validated}
            activeOpacity={0.8}>
            <Text style={styles.validateButtonText}>
              {team2Validated ? 'Validé ✓' : 'Validé !'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Modal de sortie */}
        <Modal
          visible={showExitModal}
          transparent={true}
          animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Quitter ?</Text>
              <Text style={styles.modalText}>
                Le défi en cours sera perdu.
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButtonCancel}
                  onPress={() => setShowExitModal(false)}>
                  <Text style={styles.modalButtonCancelText}>Continuer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonConfirm}
                  onPress={onBack}>
                  <Text style={styles.modalButtonConfirmText}>Quitter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // Écran de résultats
  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Résultats</Text>

        <View style={styles.winnerCard}>
          <Text style={styles.winnerText}>{getWinner()}</Text>
        </View>

        <View style={styles.scoresContainer}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreTeam}>Équipe 1</Text>
            {team1Validated ? (
              <>
                <Text style={styles.scoreTime}>
                  {team1FinalTime}s
                </Text>
                <Text style={styles.scoreLabel}>✓ Trouvé</Text>
              </>
            ) : (
              <Text style={styles.scoreLabel}>✗ Pas trouvé</Text>
            )}
          </View>

          <View style={styles.scoreCard}>
            <Text style={styles.scoreTeam}>Équipe 2</Text>
            {team2Validated ? (
              <>
                <Text style={styles.scoreTime}>
                  {team2FinalTime}s
                </Text>
                <Text style={styles.scoreLabel}>✓ Trouvé</Text>
              </>
            ) : (
              <Text style={styles.scoreLabel}>✗ Pas trouvé</Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.restartButton}
          onPress={handleRestart}
          activeOpacity={0.8}>
          <Text style={styles.restartButtonText}>Nouveau défi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quitButton}
          onPress={onBack}
          activeOpacity={0.8}>
          <Text style={styles.quitButtonText}>Retour au jeu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    backgroundColor: '#f2eded',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  backIcon: {
    fontSize: 24,
    color: '#374151',
  },
  readyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  readyTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#c12ec4',
    marginBottom: 8,
  },
  readySubtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 40,
  },
  rulesCard: {
    backgroundColor: '#f2eded',
    borderRadius: 20,
    padding: 24,
    marginBottom: 40,
    width: '100%',
  },
  rulesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
  },
  rulesText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#c12ec4',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  challengeCard: {
    backgroundColor: '#f2eded',
    borderRadius: 20,
    padding: 24,
    marginTop: 80,
    marginBottom: 30,
    alignItems: 'center',
  },
  challengeLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  challengeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c12ec4',
    textAlign: 'center',
  },
  teamContainer: {
    backgroundColor: '#f2eded',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
  },
  teamStatus: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  teamStatusSuccess: {
    backgroundColor: '#059669',
  },
  teamStatusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  timerBox: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#c12ec4',
  },
  validateButton: {
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  validateButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  validateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  vsSeparator: {
    alignItems: 'center',
    marginVertical: 8,
  },
  vsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c12ec4',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 24,
  },
  winnerCard: {
    backgroundColor: '#c12ec4',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    width: '100%',
  },
  winnerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  scoresContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
    width: '100%',
  },
  scoreCard: {
    flex: 1,
    backgroundColor: '#f2eded',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  scoreTeam: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  scoreTime: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#c12ec4',
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  restartButton: {
    backgroundColor: '#c12ec4',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 16,
    width: '100%',
  },
  restartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  quitButton: {
    backgroundColor: '#f2eded',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
  },
  quitButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButtonCancel: {
    flex: 1,
    backgroundColor: '#f2eded',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  modalButtonCancelText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  modalButtonConfirm: {
    flex: 1,
    backgroundColor: '#c12ec4',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  modalButtonConfirmText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChallengeScreen;
