# MeetMe Game 🎮

Application de rencontres gamifiée pour rencontrer de nouvelles personnes amicales ou amoureuses à travers des jeux amusants.

**Projet réalisé pendant le Startup Weekend**

## 📱 Description

MeetMe Game est une application mobile React Native qui permet aux utilisateurs de rencontrer de nouvelles personnes de manière ludique et interactive. Au lieu du traditionnel swipe, les utilisateurs jouent à des jeux amusants qui favorisent les conversations et les connexions authentiques.

## ✨ Fonctionnalités

- 🎮 **Plusieurs types de jeux** : Questions/Réponses, Devinettes, Vérité ou Action, Quiz de personnalité
- 💬 **Chat en temps réel** : Discutez avec vos matches
- 👤 **Profils personnalisés** : Créez et personnalisez votre profil
- 🎯 **Matching intelligent** : Trouvez des personnes compatibles
- ⚙️ **Paramètres personnalisables** : Type de rencontre, âge, distance, etc.

## 🏗️ Structure du projet

```
startup Weekend/
├── src/
│   ├── screens/          # Écrans de l'application
│   │   ├── WelcomeScreen.js
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── HomeScreen.js
│   │   ├── GameScreen.js
│   │   ├── GameResultScreen.js
│   │   ├── ChatScreen.js
│   │   ├── ProfileScreen.js
│   │   └── SettingsScreen.js
│   ├── components/       # Composants réutilisables
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Input.js
│   │   ├── Avatar.js
│   │   └── Loading.js
│   ├── navigation/       # Configuration de la navigation
│   │   └── AppNavigator.js
│   ├── services/         # Services API et stockage
│   │   ├── api.js
│   │   └── storage.js
│   ├── utils/           # Fonctions utilitaires
│   │   ├── helpers.js
│   │   └── theme.js
│   ├── context/         # Context API (Auth, etc.)
│   │   └── AuthContext.js
│   └── assets/          # Images, fonts, etc.
│       ├── images/
│       └── fonts/
├── App.js              # Point d'entrée de l'application
├── index.js            # Enregistrement de l'application
├── package.json        # Dépendances du projet
└── babel.config.js     # Configuration Babel
```

## 🚀 Installation

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- React Native CLI
- Pour iOS : Xcode et CocoaPods
- Pour Android : Android Studio et SDK Android

### Étapes d'installation

1. **Cloner le repository**
   ```bash
   git clone <votre-repo-url>
   cd "startup Weekend"
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Pour iOS : Installer les pods**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Lancer l'application**
   
   Pour iOS :
   ```bash
   npm run ios
   # ou
   yarn ios
   ```
   
   Pour Android :
   ```bash
   npm run android
   # ou
   yarn android
   ```

## 📦 Dépendances principales

- **React Native** : Framework mobile
- **React Navigation** : Navigation entre écrans
- **Axios** : Requêtes HTTP
- **AsyncStorage** : Stockage local
- **React Native Vector Icons** : Icônes

## 🎨 Thème

L'application utilise une palette de couleurs cohérente :
- Couleur principale : `#6B46C1` (Violet)
- Couleur secondaire : `#3182CE` (Bleu)
- Background : `#F7FAFC` (Gris clair)

## 📝 À faire (TODO)

- [ ] Connecter l'API backend
- [ ] Implémenter l'authentification réelle
- [ ] Ajouter plus de types de jeux
- [ ] Implémenter les notifications push
- [ ] Ajouter la géolocalisation
- [ ] Tests unitaires et d'intégration
- [ ] Optimisation des performances
- [ ] Mode sombre complet

## 🤝 Contribution

Ce projet a été développé pendant un Startup Weekend. Les contributions sont les bienvenues !

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👥 Équipe

Projet développé pendant le Startup Weekend par l'équipe MeetMe Game.

## 📞 Contact

Pour toute question ou suggestion, n'hésitez pas à nous contacter !

---

Fait avec ❤️ pendant le Startup Weekend
