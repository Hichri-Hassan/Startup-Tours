# 🚀 Guide de Démarrage Rapide - Point ou Culture G

## ✅ Transformation Complétée !

Tous les écrans React (web) ont été convertis en React Native. L'application est prête !

## 📱 Écrans Disponibles

1. **ScanScreen** - Scan QR avec animations
2. **DataEntryScreen** - Formulaire utilisateur
3. **WaitingScreen** - Salle d'attente animée
4. **GroupAssignmentScreen** - Attribution groupe/match
5. **QuestionScreen** - Questions + jeux (mode amis)
6. **GuessWhoScreen** - Devine qui (mode romance)

## 🎯 Parcours Utilisateur

```
📱 Scan QR
    ↓
👤 Saisie profil (nom, âge, humeur, intention)
    ↓
⏳ Attente (3-8 personnes rejoignent)
    ↓
🤝 Attribution groupe/match
    ↓
🎮 Session de jeu (12 minutes)
    - Mode Amis: Questions + jeux de société
    - Mode Romance: Devine qui avec indices
```

## 🛠️ Commandes Importantes

### Installer les dépendances
```bash
cd "/Users/hassenhicheri/Desktop/startup Weekend"
npm install
```

### Lancer sur iOS (Mac uniquement)
```bash
cd ios && pod install && cd ..
npm run ios
```

### Lancer sur Android
```bash
npm run android
```

### Démarrer Metro Bundler
```bash
npm start
```

## 🎨 Personnalisation

### Couleurs principales
- Violet: `#c12ec4`
- Violet clair: `#e1a3ff`
- Beige: `#f2eded`

### Modifier les questions
Fichier: `src/screens/QuestionScreen.js`
```javascript
const questions = [
  'Votre question ici...',
  // Ajoutez plus de questions
];
```

### Modifier les jeux suggérés
Fichier: `src/screens/QuestionScreen.js`
```javascript
const boardGames = [
  {
    name: "Nom du jeu",
    description: "Description...",
    icon: '🎮',
  },
];
```

### Modifier les indices (Devine qui)
Fichier: `src/screens/GuessWhoScreen.js`
```javascript
const clues = [
  {id: 1, text: "Nouvel indice...", revealed: false},
];
```

## 🔧 Résolution de Problèmes

### Erreur "Unable to resolve module"
```bash
npm install
watchman watch-del-all
rm -rf node_modules
npm install
```

### Erreur iOS "Command PhaseScriptExecution failed"
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Erreur Android "SDK location not found"
Créer `android/local.properties`:
```
sdk.dir=/Users/VOTRE_USERNAME/Library/Android/sdk
```

## 📦 Structure Projet

```
src/
├── screens/           # 6 écrans principaux
├── components/        # Composants réutilisables
├── services/         # API & stockage
└── utils/            # Helpers & thème
```

## 🎉 Prochaines Étapes

1. **Tester l'application**
   ```bash
   npm run ios  # ou npm run android
   ```

2. **Scanner QR réel** (optionnel)
   - Installer `react-native-qrcode-scanner`
   - Remplacer la simulation dans ScanScreen

3. **Backend** (optionnel)
   - Créer une API pour le matching réel
   - Connecter dans `src/services/api.js`

4. **Améliorations**
   - Ajouter plus de questions
   - Personnaliser les animations
   - Ajouter un système de chat

## 💡 Astuces

- **Timer**: Le timer de 12 minutes est dans QuestionScreen
- **Changement de groupe**: Se déclenche toutes les 5 interactions
- **Modes**: "meet" pour amis, "romance" pour rencontre amoureuse
- **Animations**: Utilisent l'API Animated de React Native

## 📞 Support

Projet développé pour le Startup Weekend Tours
Repository: https://github.com/Hichri-Hassan/Startup-Tours

---

**Status**: ✅ Prêt à lancer !

Bonne chance pour votre Startup Weekend ! 🚀
