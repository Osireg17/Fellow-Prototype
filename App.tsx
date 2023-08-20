import { StatusBar } from 'expo-status-bar';
import RootNavigator from './navigations/Navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MenuProvider } from 'react-native-popup-menu';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <MenuProvider>
          <RootNavigator />
          <StatusBar />
        </MenuProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
