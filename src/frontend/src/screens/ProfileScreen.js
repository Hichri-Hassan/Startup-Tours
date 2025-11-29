import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const ProfileScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>👤</Text>
                </View>
                <Text style={styles.name}>Utilisateur</Text>
                <Text style={styles.age}>25 ans</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>À propos</Text>
                <Text style={styles.sectionText}>
                    Passionné de jeux et de rencontres. J'aime découvrir de nouvelles
                    personnes à travers des activités amusantes !
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Intérêts</Text>
                <View style={styles.tagsContainer}>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>🎮 Jeux</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>🎵 Musique</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>✈️ Voyage</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>📚 Lecture</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Statistiques</Text>
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Parties jouées</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>8</Text>
                        <Text style={styles.statLabel}>Matches</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>5</Text>
                        <Text style={styles.statLabel}>Conversations</Text>
                    </View>
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
        backgroundColor: '#fff',
        padding: 30,
        alignItems: 'center',
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#6B46C1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatarText: {
        fontSize: 50,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    age: {
        fontSize: 16,
        color: '#718096',
        marginTop: 5,
    },
    section: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 12,
    },
    sectionText: {
        fontSize: 14,
        color: '#4A5568',
        lineHeight: 22,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#EDF2F7',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    tagText: {
        fontSize: 14,
        color: '#4A5568',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#6B46C1',
    },
    statLabel: {
        fontSize: 12,
        color: '#718096',
        marginTop: 4,
    },
});

export default ProfileScreen;
