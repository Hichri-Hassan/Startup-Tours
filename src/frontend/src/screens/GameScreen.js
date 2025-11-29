import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
} from 'react-native';

const clues = [
    { id: 1, text: "J'adore la musique électro", revealed: false },
    { id: 2, text: 'Je travaille dans le design', revealed: false },
    { id: 3, text: 'Mon plat préféré : les sushis', revealed: false },
    { id: 4, text: "J'ai un chat qui s'appelle Pixel", revealed: false },
    { id: 5, text: 'Je fais du yoga tous les matins', revealed: false },
    { id: 6, text: 'Mon film préféré : Inception', revealed: false },
];

const GuessWhoScreen = ({ onReset, groupMembers }) => {
    const [revealedClues, setRevealedClues] = useState([]);
    const [showExitModal, setShowExitModal] = useState(false);

    const handleRevealClue = () => {
        if (revealedClues.length < clues.length) {
            setRevealedClues([...revealedClues, revealedClues.length]);
        }
    };

    const allCluesRevealed = revealedClues.length === clues.length;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Devine qui je suis</Text>
                <Text style={styles.subtitle}>Découvre ton match pas à pas</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                {/* Clues Container */}
                <View style={styles.cluesContainer}>
                    {clues.map((clue, index) => {
                        const isRevealed = revealedClues.includes(index);
                        return (
                            <View
                                key={clue.id}
                                style={[styles.clueCard, isRevealed && styles.clueCardRevealed]}>
                                {isRevealed ? (
                                    <View style={styles.clueRevealed}>
                                        <View style={styles.clueNumber}>
                                            <Text style={styles.clueNumberText}>{index + 1}</Text>
                                        </View>
                                        <Text style={styles.clueText}>{clue.text}</Text>
                                    </View>
                                ) : (
                                    <View style={styles.clueHidden}>
                                        <View style={styles.clueNumberHidden}>
                                            <Text style={styles.clueIcon}>👁️</Text>
                                        </View>
                                        <Text style={styles.clueHiddenText}>
                                            Indice {index + 1} à découvrir...
                                        </Text>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>

                {/* Reveal Button */}
                {!allCluesRevealed && (
                    <TouchableOpacity
                        style={styles.revealButton}
                        onPress={handleRevealClue}
                        activeOpacity={0.8}>
                        <Text style={styles.revealButtonIcon}>👁️</Text>
                        <Text style={styles.revealButtonText}>Révéler le prochain indice</Text>
                    </TouchableOpacity>
                )}

                {/* All Clues Revealed */}
                {allCluesRevealed && (
                    <View style={styles.allRevealedCard}>
                        <Text style={styles.allRevealedIcon}>🎉</Text>
                        <Text style={styles.allRevealedTitle}>
                            Tu as tous les indices !
                        </Text>
                        <Text style={styles.allRevealedText}>
                            Tu penses avoir deviné qui est ton match ? C'est le moment d'aller
                            la rencontrer !
                        </Text>
                    </View>
                )}

                {/* Exit Button */}
                <TouchableOpacity
                    style={styles.exitButton}
                    onPress={() => setShowExitModal(true)}
                    activeOpacity={0.6}>
                    <Text style={styles.exitIcon}>🚪</Text>
                    <Text style={styles.exitText}>Quitter la session</Text>
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
                            Tu es sûr de vouloir quitter ? Tu perdras ta place avec ton match.
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalButtonCancel}
                                onPress={() => setShowExitModal(false)}>
                                <Text style={styles.modalButtonCancelText}>Annuler</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButtonConfirm} onPress={onReset}>
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
        padding: 24,
        paddingTop: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#c12ec4',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
    },
    content: {
        flexGrow: 1,
        padding: 24,
        paddingTop: 0,
    },
    cluesContainer: {
        marginBottom: 24,
    },
    clueCard: {
        backgroundColor: '#f2eded',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        opacity: 0.5,
    },
    clueCardRevealed: {
        opacity: 1,
        borderWidth: 2,
        borderColor: '#e1a3ff',
    },
    clueRevealed: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    clueNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#e1a3ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    clueNumberText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
    clueText: {
        flex: 1,
        fontSize: 16,
        color: '#374151',
        lineHeight: 24,
    },
    clueHidden: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    clueNumberHidden: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    clueIcon: {
        fontSize: 16,
    },
    clueHiddenText: {
        flex: 1,
        fontSize: 16,
        color: '#9CA3AF',
    },
    revealButton: {
        backgroundColor: '#e1a3ff',
        borderRadius: 25,
        paddingVertical: 16,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    revealButtonIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    revealButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    allRevealedCard: {
        backgroundColor: '#f2eded',
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        marginBottom: 16,
    },
    allRevealedIcon: {
        fontSize: 48,
        marginBottom: 12,
    },
    allRevealedTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#c12ec4',
        marginBottom: 8,
    },
    allRevealedText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 22,
    },
    exitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginTop: 8,
    },
    exitIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    exitText: {
        color: '#6B7280',
        fontSize: 14,
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

export default GuessWhoScreen;
