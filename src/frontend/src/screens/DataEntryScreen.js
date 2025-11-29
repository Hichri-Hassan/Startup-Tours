import React, {useState} from 'react';
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

const DataEntryScreen = ({onSubmit, onBack}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [mood, setMood] = useState('');
  const [ageError, setAgeError] = useState('');

  const moodOptions = [
    {id: 'chill', label: 'Chill', icon: '😌'},
    {id: 'social', label: 'Social', icon: '🤝'},
    {id: 'fun', label: 'Fun', icon: '🎉'},
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
    if (name && age && mood && !ageError) {
      onSubmit({name, age, mood, lookingFor: '', intention: mood});
    }
  };

  const isValid =
    name.trim() &&
    age.trim() &&
    mood &&
    !ageError;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Back Button */}
        {onBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}>
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backText}>Retour</Text>
          </TouchableOpacity>
        )}

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
          <Text style={styles.label}>Ton mood ce soir ?</Text>
          <View style={styles.intentionContainer}>
            {moodOptions.map(opt => (
              <TouchableOpacity
                key={opt.id}
                onPress={() => setMood(opt.id)}
                style={[
                  styles.intentionButton,
                  mood === opt.id && styles.intentionButtonActive,
                ]}>
                <Text style={styles.intentionIcon}>{opt.icon}</Text>
                <Text style={styles.intentionLabel}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f2eded',
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: 24,
    color: '#c12ec4',
    marginRight: 4,
  },
  backText: {
    fontSize: 16,
    color: '#c12ec4',
    fontWeight: '600',
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
