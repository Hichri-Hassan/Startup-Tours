import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent appelle AppRegistry.registerComponent('main', () => App);
// Il garantit que l'environnement est configuré correctement pour Expo
registerRootComponent(App);
