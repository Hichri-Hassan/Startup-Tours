import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';

const SettingsScreen = ({navigation}) => {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Préférences</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{false: '#CBD5E0', true: '#9F7AEA'}}
            thumbColor={notifications ? '#6B46C1' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Mode sombre</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{false: '#CBD5E0', true: '#9F7AEA'}}
            thumbColor={darkMode ? '#6B46C1' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recherche</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Type de rencontre</Text>
          <Text style={styles.settingValue}>Amical & Amoureux</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Tranche d'âge</Text>
          <Text style={styles.settingValue}>18-35 ans</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Distance maximale</Text>
          <Text style={styles.settingValue}>50 km</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Compte</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Modifier le profil</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Confidentialité</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={[styles.settingText, styles.dangerText]}>
            Se déconnecter
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#718096',
    marginTop: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  settingText: {
    fontSize: 16,
    color: '#2D3748',
  },
  settingValue: {
    fontSize: 14,
    color: '#718096',
  },
  arrow: {
    fontSize: 24,
    color: '#CBD5E0',
  },
  dangerText: {
    color: '#E53E3E',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  version: {
    fontSize: 12,
    color: '#A0AEC0',
  },
});

export default SettingsScreen;
