/**
 * @format
 */


import 'react-native-get-random-values';
import { registerGlobals } from '@livekit/react-native';

// MUST be called BEFORE AppRegistry
registerGlobals();

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);


