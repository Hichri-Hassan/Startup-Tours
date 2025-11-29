import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GameResultScreen = ({ route, navigation }) => {
    const { score, total } = route.params || { score: 0, total: 0 };
    const percentage = Math.round((score / total) * 100);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>🎉</Text>
                <Text style={styles.title}>Bravo !</Text>
                <Text style={styles.score}>
                    {score} / {total}
                </Text>
                <Text style={styles.percentage}>{percentage}% de réussite</Text>

                <Text style={styles.message}>
                    Tu as trouvé une nouvelle personne compatible !
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Chat')}>
                    <Text style={styles.buttonText}>Commencer à discuter 💬</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    onPress={() => navigation.navigate('Home')}>
                    <Text style={[styles.buttonText, styles.secondaryText]}>
                        Jouer encore
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6B46C1',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emoji: {
        fontSize: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    score: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    percentage: {
        fontSize: 24,
        color: '#E9D8FD',
        marginBottom: 30,
    },
    message: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginVertical: 8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6B46C1',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#fff',
    },
    secondaryText: {
        color: '#fff',
    },
});

export default GameResultScreen;
