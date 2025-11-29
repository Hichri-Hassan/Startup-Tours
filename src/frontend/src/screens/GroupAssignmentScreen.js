import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const GroupAssignmentScreen = ({ onStartSession, userName, intention }) => {
    const isRomance = intention === 'romance';
    const groupMembers = isRomance
        ? ['Julie', userName || 'Toi']
        : ['Julie', 'Marc', 'Sarah', userName || 'Toi'];
    const tableNumber = 5;
    const groupNumber = 2;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Success Icon */}
            <View style={styles.iconContainer}>
                <Text style={styles.sparkles}>✨</Text>
            </View>

            {/* Title */}
            <Text style={styles.title}>
                {isRomance
                    ? 'Tu es matché avec Julie 🤝'
                    : `Tu rejoins le groupe ${groupNumber} ! 🤝`}
            </Text>

            <Text style={styles.subtitle}>
                {isRomance ? 'Prêt·e à découvrir qui elle est ?' : 'Rencontre tes nouveaux amis'}
            </Text>

            {/* Group Members Card */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderIcon}>👥</Text>
                    <Text style={styles.cardHeaderText}>
                        {isRomance ? 'Ton match' : 'Membres du groupe'}
                    </Text>
                </View>

                <View style={styles.membersList}>
                    {groupMembers.map((member, index) => (
                        <View key={member} style={styles.memberItem}>
                            <View style={styles.memberAvatar}>
                                <Text style={styles.memberAvatarText}>{member[0]}</Text>
                            </View>
                            <Text style={styles.memberName}>{member}</Text>
                            {member === (userName || 'Toi') && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>C'est toi</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </View>

            {/* Table Info */}
            <View style={styles.tableInfo}>
                <Text style={styles.tableIcon}>📍</Text>
                <Text style={styles.tableText}>Table {tableNumber}</Text>
            </View>

            {/* CTA Button */}
            <TouchableOpacity
                style={styles.button}
                onPress={onStartSession}
                activeOpacity={0.8}>
                <Text style={styles.buttonText}>Commencer la session</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#ffffff',
    },
    iconContainer: {
        marginBottom: 24,
    },
    sparkles: {
        fontSize: 48,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#c12ec4',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 32,
        textAlign: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#f2eded',
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardHeaderIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    cardHeaderText: {
        fontSize: 16,
        color: '#374151',
    },
    membersList: {
        gap: 12,
    },
    memberItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    memberAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    memberAvatarText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#c12ec4',
    },
    memberName: {
        fontSize: 16,
        color: '#374151',
        flex: 1,
    },
    badge: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 12,
        color: '#c12ec4',
    },
    tableInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#f2eded',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginBottom: 32,
    },
    tableIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    tableText: {
        fontSize: 16,
        color: '#374151',
    },
    button: {
        width: '100%',
        backgroundColor: '#c12ec4',
        paddingVertical: 16,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default GroupAssignmentScreen;
