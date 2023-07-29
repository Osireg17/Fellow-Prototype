import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RootNavigator from './navigations/Navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { MenuProvider } from 'react-native-popup-menu';
import 'react-native-gesture-handler';

export default function App() {
  return (
      <SafeAreaProvider>
        <MenuProvider>
        <RootNavigator/>
        <StatusBar/>
        </MenuProvider>
      </SafeAreaProvider> 
  );
}
