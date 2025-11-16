// eslint-disable-next-line
import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import appJson from './app.json';
import { App } from './src';

const appName = appJson.name;

AppRegistry.registerComponent(appName, () => App);
