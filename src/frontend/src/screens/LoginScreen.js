import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

const DataEntryScreen = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [mood, setMood] = useState('');
    const [intention, setIntention] = useState('');
    const [lookingFor, setLookingFor] = useState('');
    const [ageError, setAgeError] = useState('');

    const moods = [
        { id: 'chill', label: 'Chill', icon: '😌' },
        { id: 'social', label: 'Social', icon: '🤝' },
        { id: 'fun', label: 'Fun', icon: '🎉' },
    ];

    const intentions = [
        { id: 'meet', label: 'Rencontrer des nouvelles personnes', icon: '👥' },
        { id: 'romance', label: 'Rencontre amoureuse', icon: '❤️' },
    ];

    const lookingForOptions = [
        { id: 'funny', label: "Quelqu'un de drôle" },
        { id: 'spontaneous', label: 'Spontané(e)' },
        { id: 'deep', label: 'Conversations profondes' },
        { id: 'adventurous', label: 'Aventurier(e)' },
        { id: 'chill', label: 'Ambiance chill' },
        { id: 'energetic', label: 'Énergique' },
    ];

    const handleAgeChange = value => {
        setAge(value);

        if (value === '') {
            setAgeError('');
        } else if (isNaN(Number(value)) || value.includes('.') || value.includes(',')) {
            setAgeError('Vous devez entrer un nombre');
        } else {
            setAgeError('');
        }
    };

    const handleSubmit = () => {
        if (name && age && mood && intention && !ageError) {
            if (intention === 'romance' && !lookingFor) {
                return;
            }
            onSubmit({ name, age, mood, intention, lookingFor });
        }
    };

    const isValid =
        name.trim() &&
        age.trim() &&
        mood &&
        intention &&
        !ageError &&
        (intention !== 'romance' || lookingFor);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Bienvenue !</Text>
                    <Text style={styles.subtitle}>
                        Quelques infos pour bien commencer
                    </Text>
                </View>

                {/* Name Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Ton prénom</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Ex: Alex"
                        placeholderTextColor="#A0AEC0"
                    />
                </View>

                {/* Age Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Ton âge</Text>
                    <TextInput
                        style={[styles.input, ageError && styles.inputError]}
                        value={age}
                        onChangeText={handleAgeChange}
                        placeholder="Ex: 25"
                        placeholderTextColor="#A0AEC0"
                        keyboardType="numeric"
                    />
                    {ageError && <Text style={styles.errorText}>{ageError}</Text>}
                </View>

                {/* Mood Selector */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Comment tu te sens ?</Text>
                    <View style={styles.moodContainer}>
                        {moods.map(m => (
                            <TouchableOpacity
                                key={m.id}
                                onPress={() => setMood(m.id)}
                                style={[
                                    styles.moodButton,
                                    mood === m.id && styles.moodButtonActive,
                                ]}>
                                <Text style={styles.moodIcon}>{m.icon}</Text>
                                <Text style={styles.moodLabel}>{m.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Intention Selector */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Ton intention ce soir</Text>
                    <View style={styles.intentionContainer}>
                        {intentions.map(int => (
                            <TouchableOpacity
                                key={int.id}
                                onPress={() => setIntention(int.id)}
                                style={[
                                    styles.intentionButton,
                                    intention === int.id && styles.intentionButtonActive,
                                ]}>
                                <Text style={styles.intentionIcon}>{int.icon}</Text>
                                <Text style={styles.intentionLabel}>{int.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Looking For (only if romance) */}
                {intention === 'romance' && (
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Tu cherches...</Text>
                        <View style={styles.tagsContainer}>
                            {lookingForOptions.map(opt => (
                                <TouchableOpacity
                                    key={opt.id}
                                    onPress={() => setLookingFor(opt.id)}
                                    style={[
                                        styles.tag,
                                        lookingFor === opt.id && styles.tagActive,
                                    ]}>
                                    <Text
                                        style={[
                                            styles.tagText,
                                            lookingFor === opt.id && styles.tagTextActive,
                                        ]}>
                                        {opt.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* Submit Button */}
                <TouchableOpacity
                    style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={!isValid}
                    activeOpacity={0.8}>
                    <Text style={styles.submitButtonText}>C'est parti ! 🎉</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 48,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#c12ec4',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        color: '#374151',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#f2eded',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 16,
        color: '#374151',
    },
    inputError: {
        borderWidth: 2,
        borderColor: '#EF4444',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 14,
        marginTop: 8,
    },
    moodContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    moodButton: {
        flex: 1,
        backgroundColor: '#f2eded',
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
    },
    moodButtonActive: {
        backgroundColor: '#e1a3ff',
        opacity: 0.2,
        borderWidth: 2,
        borderColor: '#e1a3ff',
    },
    moodIcon: {
        fontSize: 24,
        marginBottom: 4,
    },
    moodLabel: {
        fontSize: 14,
        color: '#374151',
    },
    intentionContainer: {
        gap: 12,
    },
    intentionButton: {
        backgroundColor: '#f2eded',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    intentionButtonActive: {
        backgroundColor: '#e1a3ff',
        opacity: 0.2,
        borderWidth: 2,
        borderColor: '#e1a3ff',
    },
    intentionIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    intentionLabel: {
        fontSize: 16,
        color: '#374151',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        backgroundColor: '#f2eded',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    tagActive: {
        backgroundColor: '#e1a3ff',
    },
    tagText: {
        fontSize: 14,
        color: '#374151',
    },
    tagTextActive: {
        color: '#ffffff',
    },
    submitButton: {
        backgroundColor: '#c12ec4',
        borderRadius: 25,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    submitButtonDisabled: {
        backgroundColor: '#D1D5DB',
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default DataEntryScreen;
