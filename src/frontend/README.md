# Point ou Culture G - Application Mobile 🎮

Application React Native de rencontres gamifiées pour le Startup Weekend Tours.

**Transformé depuis un mockup React web vers une application mobile complète !**

## 📱 Description

Point ou Culture G est une application mobile qui permet aux utilisateurs de rencontrer de nouvelles personnes (amicales ou amoureuses) dans des bars/événements via des jeux et des questions interactives. L'app utilise un système de scan QR pour rejoindre des soirées et matcher avec d'autres participants.

## ✨ Fonctionnalités

### 🎯 Parcours Utilisateur Complet

1. **Scan QR** - Scanne le QR code du bar pour rejoindre la soirée
2. **Saisie de profil** - Renseigne ton prénom, âge, humeur et intention (amical ou romance)
3. **Salle d'attente** - Animation pendant que d'autres rejoignent
4. **Attribution de groupe** - Match automatique selon ton intention
5. **Session de jeu** :
   - **Mode Amis** : Questions brise-glace + suggestions de jeux de société
   - **Mode Romance** : Jeu "Devine qui" avec indices progressifs
6. **Timer de 12 minutes** avec changement de groupe automatique

### 🎨 Caractéristiques Techniques

- ✅ **6 écrans principaux** complètement fonctionnels
- ✅ **Animations fluides** avec Animated API
- ✅ **Design moderne** avec couleurs #c12ec4 (violet) et #e1a3ff (violet clair)
- ✅ **Navigation fluide** entre les écrans
- ✅ **Modales** pour confirmation de sortie
- ✅ **Timer dynamique** avec compte à rebours
- ✅ **États conditionnels** selon intention (amis vs romance)

## 🏗️ Structure du projet

```
startup Weekend/
├── App.js                    # Point d'entrée - Gestion de la navigation
├── src/
│   ├── screens/
│   │   ├── ScanScreen.js              # Écran de scan QR avec animations
│   │   ├── DataEntryScreen.js         # Formulaire de saisie utilisateur
│   │   ├── WaitingScreen.js           # Salle d'attente avec animations
│   │   ├── GroupAssignmentScreen.js   # Attribution du groupe/match
│   │   ├── QuestionScreen.js          # Questions + jeux (mode amis)
│   │   └── GuessWhoScreen.js          # Jeu devine qui (mode romance)
│   ├── components/          # Composants réutilisables (conservés)
│   ├── services/           # API et stockage (conservés)
│   └── utils/             # Helpers et thème (conservés)
├── package.json
└── README.md
```

## 🚀 Installation & Lancement

### Prérequis

- Node.js (version 16+)
- npm ou yarn
- React Native CLI
- Pour iOS : Xcode + CocoaPods
- Pour Android : Android Studio + SDK

### Étapes

1. **Cloner le repository**
   ```bash
   git clone https://github.com/Hichri-Hassan/Startup-Tours.git
   cd "startup Weekend"
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Pour iOS (Mac uniquement)**
   ```bash
   cd ios && pod install && cd ..
   npm run ios
   ```

4. **Pour Android**
   ```bash
   npm run android
   ```

## 📦 Dépendances Principales

```json
{
  "react": "18.2.0",
  "react-native": "0.72.6",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/stack": "^6.3.20",
  "react-native-reanimated": "^3.5.4",
  "react-native-gesture-handler": "^2.13.4"
}
```

## 🎨 Design System

### Couleurs
- **Primary** : `#c12ec4` (Violet)
- **Primary Light** : `#e1a3ff` (Violet clair)
- **Background** : `#f2eded` (Beige clair)
- **Text Primary** : `#374151` (Gris foncé)
- **Text Secondary** : `#6B7280` (Gris)

### Typographie
- **Titres** : 24-28px, Bold
- **Sous-titres** : 16-20px, Medium
- **Corps** : 14-16px, Regular

## 🔄 Transformation React → React Native

### Ce qui a été transformé :

| React Web | React Native |
|-----------|--------------|
| `<div>` | `<View>` |
| `<span>`, `<p>` | `<Text>` |
| `<button>` | `<TouchableOpacity>` |
| `<input>` | `<TextInput>` |
| Tailwind CSS classes | StyleSheet API |
| Framer Motion | Animated API |
| CSS hover/transitions | Animation natives |

### Écrans convertis :

1. ✅ **ScanScreen** - QR scanning avec animations de coins pulsants
2. ✅ **DataEntryScreen** - Formulaire avec validation d'âge
3. ✅ **WaitingScreen** - Cercles animés + compteur de participants
4. ✅ **GroupAssignmentScreen** - Affichage du groupe assigné
5. ✅ **QuestionScreen** - Questions/jeux avec timer et changement de groupe
6. ✅ **GuessWhoScreen** - Révélation progressive d'indices

## 📝 Flux de Navigation

```
ScanScreen
    ↓
DataEntryScreen
    ↓
WaitingScreen
    ↓
GroupAssignmentScreen
    ↓
    ├→ QuestionScreen (si intention = "meet")
    └→ GuessWhoScreen (si intention = "romance")
```

## 🎮 Jeux Disponibles

### Mode Amis (QuestionScreen)
- **Questions brise-glace** (8 questions variées)
- **Jeux de société suggérés** :
  - Time's Up 🎭
  - Just One 💭
  - Limite Limite 😈
  - Story Cubes 🎲
  - Blanc Manger Coco 🃏

### Mode Romance (GuessWhoScreen)
- **6 indices progressifs** à révéler
- Découvre qui est ton match pas à pas
- Interface intuitive avec cartes révélables

## 🔧 Fonctionnalités Avancées

- **Timer de session** : 12 minutes avec changement automatique de groupe
- **Modales de confirmation** : Avant de quitter une session
- **Animations fluides** : Cercles pulsants, transitions, effets de révélation
- **Responsive** : S'adapte à toutes les tailles d'écran mobile
- **États conditionnels** : Différents parcours selon l'intention utilisateur

## 🚧 Améliorations Futures

- [ ] Intégration scanner QR réel (react-native-qrcode-scanner)
- [ ] Backend API pour matching réel
- [ ] Système de chat entre matches
- [ ] Notifications push
- [ ] Profils utilisateurs complets
- [ ] Géolocalisation des événements
- [ ] Statistiques et historique
- [ ] Mode sombre

## 📄 Licence

Ce projet est développé pour le Startup Weekend Tours.

## 👥 Équipe Startup Weekend

Développé avec ❤️ pendant le Startup Weekend Tours

---

**Status** : ✅ **Transformation React → React Native COMPLÉTÉE !**

Tous les écrans ont été convertis et sont fonctionnels. L'application est prête à être testée sur iOS et Android.
