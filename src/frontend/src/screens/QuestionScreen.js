import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { getRandomQuestion } from '../data/questions';
import { getRandomChallenge, shouldShowChallenge } from '../data/challenges';

const QuestionScreen = ({ onReset, groupMembers, onStartChallenge }) => {
  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion());
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [showGroupChange, setShowGroupChange] = useState(false);
  const [showBreak, setShowBreak] = useState(false);
  const [breakTimeRemaining, setBreakTimeRemaining] = useState(5 * 60); // 5 minutes
  const [activityType, setActivityType] = useState('question');
  const [showExitModal, setShowExitModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60); // 1 minute per question
  const [clickCount, setClickCount] = useState(0);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [usedChallengeIds, setUsedChallengeIds] = useState([]);
  const [challengeValidated, setChallengeValidated] = useState(false);
  const [teamScore, setTeamScore] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [validationState, setValidationState] = useState(null); // 'waiting', 'player1_claimed', 'player2_claimed', 'validated', 'rejected'
  const [playerClaim, setPlayerClaim] = useState(null); // 'player1', 'player2'
  const [opponentResponse, setOpponentResponse] = useState(null); // For demo: simulate opponent actions

  useEffect(() => {
    // Timer for break
    if (showBreak) {
      const breakTimer = setInterval(() => {
        setBreakTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(breakTimer);
            setShowBreak(false);
            setBreakTimeRemaining(5 * 60);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(breakTimer);
    }

    // Don't run timer during challenges or when showing break/group change
    if (activityType === 'challenge' || showGroupChange) {
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-advance to next question when time runs out (questions only)
          handleNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, activityType, showBreak, showGroupChange]);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleValidateChallenge = () => {
    if (currentChallenge?.type === '1v1' || currentChallenge?.type === '2v2') {
      // Player claims victory - I won!
      setValidationState('player1_claimed');
      setPlayerClaim('player1');
      
      // Simulate opponent response after a delay
      setTimeout(() => {
        const opponentAccepts = Math.random() > 0.3; // 70% chance they accept
        if (opponentAccepts) {
          setOpponentResponse('accepted');
          setValidationState('validated');
          setChallengeValidated(true);
          setTeamScore(prev => prev + 4); // I win +4 points
        } else {
          setOpponentResponse('rejected');
          setValidationState('rejected');
          setChallengeValidated(true);
          setTeamScore(prev => Math.max(0, prev - 1)); // Both lose 1 point
        }
      }, 2000);
    } else {
      // Solo challenge - direct validation
      setChallengeValidated(true);
      setTeamScore(prev => prev + 4);
    }
  };

  const handleAcceptOpponentClaim = () => {
    // Opponent wins, I accept
    setOpponentResponse('accepted');
    setValidationState('validated');
    setChallengeValidated(true);
    // No points for me, opponent gets the points
  };

  const handleRejectOpponentClaim = () => {
    // I reject opponent's claim
    setOpponentResponse('rejected');
    setValidationState('rejected');
    setChallengeValidated(true);
    setTeamScore(prev => Math.max(0, prev - 1)); // Both lose 1 point
  };

  // Simulate opponent claiming victory first (30% chance after 3 seconds)
  useEffect(() => {
    if (activityType === 'challenge' && 
        (currentChallenge?.type === '1v1' || currentChallenge?.type === '2v2') && 
        !validationState && 
        !challengeValidated) {
      
      const opponentClaimsFirst = Math.random() > 0.7; // 30% chance
      
      if (opponentClaimsFirst) {
        const timer = setTimeout(() => {
          if (!validationState && !challengeValidated) {
            // Opponent claims victory first
            setValidationState('player2_claimed');
            setPlayerClaim('player2');
          }
        }, 3000); // After 3 seconds
        
        return () => clearTimeout(timer);
      }
    }
  }, [activityType, currentChallenge, validationState, challengeValidated]);

  const handleFailChallenge = () => {
    setChallengeValidated(true);
    setValidationState(null);
    setPlayerClaim(null);
    setOpponentResponse(null);
    // No points added for failed challenge
  };

  const handleNext = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    // Show leaderboard after 10 activities
    if (newClickCount >= 10) {
      setShowLeaderboard(true);
      return;
    }

    // Show break every 5 activities (before group change)
    if (newClickCount % 5 === 0) {
      setShowBreak(true);
      return;
    }

    // If currently showing a challenge, go back to a question
    if (activityType === 'challenge') {
      const newQuestion = getRandomQuestion(usedQuestionIds);
      setCurrentQuestion(newQuestion);
      setUsedQuestionIds([...usedQuestionIds, newQuestion.id]);
      setCurrentChallenge(null);
      setActivityType('question');
      setChallengeValidated(false);
      setTimeRemaining(60);
    } else {
      // After a question, ALWAYS show a challenge
      const newChallenge = getRandomChallenge(usedChallengeIds);
      setCurrentChallenge(newChallenge);
      setUsedChallengeIds([...usedChallengeIds, newChallenge.id]);
      setActivityType('challenge');
      setChallengeValidated(false);
      setValidationState(null);
      setPlayerClaim(null);
      setOpponentResponse(null);
      setTimeRemaining(60);
    }
  };

  const handleContinueAfterChange = () => {
    setShowGroupChange(false);
    setUsedQuestionIds([]);
    setUsedChallengeIds([]);
    const newQuestion = getRandomQuestion();
    setCurrentQuestion(newQuestion);
    setUsedQuestionIds([newQuestion.id]);
    setActivityType('question');
    setChallengeValidated(false);
    setTimeRemaining(60);
  };

  const handleContinueAfterBreak = () => {
    setShowBreak(false);
    setShowGroupChange(true);
  };

  const handleSkipBreak = () => {
    setShowBreak(false);
    setBreakTimeRemaining(5 * 60);
    setShowGroupChange(true);
  };

  if (showLeaderboard) {
    const leaderboardData = [
      { rank: 1, team: 'Ton équipe', score: teamScore, isCurrentTeam: true },
      { rank: 2, team: 'Les Conquistadors', score: teamScore - 1, isCurrentTeam: false },
    ].sort((a, b) => b.score - a.score).map((team, index) => ({
      ...team,
      rank: index + 1
    }));

    return (
      <View style={styles.container}>
        <View style={styles.leaderboardContainer}>
          <View style={styles.leaderboardIcon}>
            <Text style={styles.leaderboardIconText}>🏆</Text>
          </View>

          <Text style={styles.leaderboardTitle}>Classement Final</Text>
          <Text style={styles.leaderboardSubtitle}>Bravo pour cette session !</Text>

          <View style={styles.leaderboardList}>
            {leaderboardData.map((team) => (
              <View
                key={team.team}
                style={[
                  styles.leaderboardItem,
                  team.isCurrentTeam && styles.leaderboardItemCurrent,
                ]}>
                <View style={styles.leaderboardRank}>
                  <Text style={styles.leaderboardRankText}>{team.rank}</Text>
                </View>
                <Text style={[
                  styles.leaderboardTeamName,
                  team.isCurrentTeam && styles.leaderboardTeamNameCurrent,
                ]}>
                  {team.team}
                </Text>
                <View style={styles.leaderboardScore}>
                  <Text style={styles.leaderboardScoreText}>{team.score}</Text>
                  <Text style={styles.leaderboardScoreLabel}>pts</Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={onReset}
            activeOpacity={0.8}>
            <Text style={styles.continueButtonText}>Retour à l'accueil</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (showBreak) {
    return (
      <View style={styles.container}>
        <View style={styles.changeContainer}>
          <View style={styles.breakIcon}>
            <Text style={styles.changeIconText}>☕</Text>
          </View>

          <Text style={styles.changeTitle}>Pause de 5 minutes !</Text>
          <Text style={styles.changeSubtitle}>
            Profitez-en pour vous détendre, aller aux toilettes ou prendre un verre 🍹
          </Text>

          <View style={styles.breakTimerCard}>
            <Text style={styles.breakTimerLabel}>Temps restant</Text>
            <Text style={styles.breakTimerText}>{formatTime(breakTimeRemaining)}</Text>
            <Text style={styles.breakTimerSubtext}>
              La session reprendra automatiquement
            </Text>
          </View>

          <TouchableOpacity
            style={styles.skipBreakButton}
            onPress={handleSkipBreak}
            activeOpacity={0.8}>
            <Text style={styles.skipBreakButtonText}>Passer la pause</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
        {activityType === 'question' ? (
          <View style={styles.timerContainer}>
            <Text style={styles.timerIcon}>⏱️</Text>
            <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
          </View>
        ) : (
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreIcon}>⭐</Text>
            <Text style={styles.scoreText}>Score: {teamScore}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => setShowExitModal(true)}>
          <Text style={styles.exitIcon}>🚪</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {activityType === 'question' ? (
          <View style={styles.activityContainer}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>💬</Text>
            </View>
            <Text style={styles.activityTitle}>Question du moment</Text>
            <View style={styles.questionCard}>
              <Text style={styles.questionText}>
                {currentQuestion?.text || ''}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.activityContainer}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>🎯</Text>
            </View>
            <Text style={styles.activityTitle}>
              Défi {currentChallenge?.type === '1v1' ? '1v1' : currentChallenge?.type === '2v2' ? '2v2' : 'Solo'}
            </Text>
            <View style={styles.gameCard}>
              <Text style={styles.gameName}>Challenge !</Text>
              <Text style={styles.gameDescription}>
                {currentChallenge?.text || ''}
              </Text>
            </View>
            
            {/* Validation pour challenges 1v1 et 2v2 */}
            {(currentChallenge?.type === '1v1' || currentChallenge?.type === '2v2') && !challengeValidated && (
              <>
                {!validationState && (
                  <View style={styles.challengeButtons}>
                    <TouchableOpacity
                      style={styles.validateButton}
                      onPress={handleValidateChallenge}
                      activeOpacity={0.8}>
                      <Text style={styles.validateButtonText}>
                        🏆 J'ai gagné ! (+4 pts)
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.failButton}
                      onPress={handleFailChallenge}
                      activeOpacity={0.8}>
                      <Text style={styles.failButtonText}>✗ Abandonner</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {validationState === 'player1_claimed' && !opponentResponse && (
                  <View style={styles.validationWaiting}>
                    <Text style={styles.validationWaitingIcon}>⏳</Text>
                    <Text style={styles.validationWaitingText}>
                      Tu as revendiqué la victoire !
                    </Text>
                    <Text style={styles.validationWaitingSubtext}>
                      {currentChallenge?.type === '1v1' 
                        ? 'En attente que ton adversaire confirme que TU as gagné...'
                        : 'En attente que l\'autre équipe confirme que VOUS avez gagné...'}
                    </Text>
                  </View>
                )}

                {validationState === 'player2_claimed' && (
                  <View style={styles.opponentClaimCard}>
                    <Text style={styles.opponentClaimIcon}>⚔️</Text>
                    <Text style={styles.opponentClaimTitle}>
                      Ton adversaire revendique la victoire !
                    </Text>
                    <Text style={styles.opponentClaimText}>
                      Il/Elle prétend avoir gagné. Est-ce que tu acceptes SA victoire ?
                    </Text>
                    <View style={styles.opponentClaimButtons}>
                      <TouchableOpacity
                        style={styles.acceptButton}
                        onPress={handleAcceptOpponentClaim}
                        activeOpacity={0.8}>
                        <Text style={styles.acceptButtonText}>✓ Oui, il/elle a gagné</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.rejectButton}
                        onPress={handleRejectOpponentClaim}
                        activeOpacity={0.8}>
                        <Text style={styles.rejectButtonText}>✗ Non ! (-1 pt chacun)</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </>
            )}

            {/* Validation pour challenges solo */}
            {currentChallenge?.type === 'solo' && !challengeValidated && (
              <View style={styles.challengeButtons}>
                <TouchableOpacity
                  style={styles.validateButton}
                  onPress={handleValidateChallenge}
                  activeOpacity={0.8}>
                  <Text style={styles.validateButtonText}>✓ Réussi (+4 pts)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.failButton}
                  onPress={handleFailChallenge}
                  activeOpacity={0.8}>
                  <Text style={styles.failButtonText}>✗ Échoué</Text>
                </TouchableOpacity>
              </View>
            )}
            
            {challengeValidated && validationState === 'validated' && (
              <View style={styles.validatedBadge}>
                <Text style={styles.validatedBadgeText}>
                  {playerClaim === 'player1' 
                    ? '🏆 Victoire confirmée ! TU as gagné +4 pts' 
                    : '😔 Ton adversaire a gagné'}
                </Text>
              </View>
            )}

            {challengeValidated && validationState === 'rejected' && (
              <View style={styles.rejectedBadge}>
                <Text style={styles.rejectedBadgeText}>
                  ⚠️ Désaccord ! Vous perdez tous les deux -1 pt
                </Text>
              </View>
            )}

            {challengeValidated && !validationState && (
              <View style={styles.validatedBadge}>
                <Text style={styles.validatedBadgeText}>Validé !</Text>
              </View>
            )}
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.nextButton,
            (activityType === 'challenge' && !challengeValidated) && styles.nextButtonDisabled
          ]}
          onPress={handleNext}
          disabled={activityType === 'challenge' && !challengeValidated}
          activeOpacity={0.8}>
          <Text style={styles.nextButtonText}>
            {activityType === 'challenge' ? 'Question suivante' : 'Suivant'}
          </Text>
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
    paddingTop: 40,
    marginTop: 20,
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
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2eded',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  scoreIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  scoreText: {
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
    paddingTop: 48,
  },
  activityContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 60,
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
    backgroundColor: '#c12ec4',
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
  nextButtonDisabled: {
    backgroundColor: '#d1d5db',
    opacity: 0.5,
  },
  challengeButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    width: '100%',
  },
  validateButton: {
    flex: 1,
    backgroundColor: '#10b981',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  validateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  failButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  failButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  validatedBadge: {
    backgroundColor: '#d1fae5',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  validatedBadgeText: {
    color: '#065f46',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rejectedBadge: {
    backgroundColor: '#fee2e2',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  rejectedBadgeText: {
    color: '#991b1b',
    fontSize: 16,
    fontWeight: 'bold',
  },
  validationWaiting: {
    backgroundColor: '#fef3c7',
    borderRadius: 20,
    padding: 24,
    marginTop: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f59e0b',
  },
  validationWaitingIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  validationWaitingText: {
    color: '#92400e',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  validationWaitingSubtext: {
    color: '#92400e',
    fontSize: 14,
    textAlign: 'center',
  },
  opponentClaimCard: {
    backgroundColor: '#fef2f2',
    borderRadius: 20,
    padding: 24,
    marginTop: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  opponentClaimIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  opponentClaimTitle: {
    color: '#991b1b',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  opponentClaimText: {
    color: '#991b1b',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  opponentClaimButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#10b981',
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#ef4444',
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  leaderboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  leaderboardIcon: {
    width: 96,
    height: 96,
    backgroundColor: '#fef3c7',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  leaderboardIconText: {
    fontSize: 48,
  },
  leaderboardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#c12ec4',
    marginBottom: 8,
  },
  leaderboardSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  leaderboardList: {
    width: '100%',
    marginBottom: 32,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2eded',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  leaderboardItemCurrent: {
    backgroundColor: '#e1a3ff',
    borderWidth: 2,
    borderColor: '#c12ec4',
  },
  leaderboardRank: {
    width: 36,
    height: 36,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  leaderboardRankText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c12ec4',
  },
  leaderboardTeamName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  leaderboardTeamNameCurrent: {
    color: '#c12ec4',
    fontWeight: 'bold',
  },
  leaderboardScore: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  leaderboardScoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c12ec4',
    marginRight: 4,
  },
  leaderboardScoreLabel: {
    fontSize: 14,
    color: '#6B7280',
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
  breakIcon: {
    width: 96,
    height: 96,
    backgroundColor: '#fef3c7',
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
    backgroundColor: '#c12ec4',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  breakTimerCard: {
    backgroundColor: '#f2eded',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    marginBottom: 24,
    alignItems: 'center',
  },
  breakTimerLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
  },
  breakTimerText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#c12ec4',
    marginBottom: 8,
  },
  breakTimerSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  skipBreakButton: {
    width: '100%',
    backgroundColor: '#f2eded',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#c12ec4',
  },
  skipBreakButtonText: {
    color: '#c12ec4',
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
