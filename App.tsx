import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import List from './src/screens/List';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar 
       style="light"
        backgroundColor='transparent'
        translucent
      />
      <List/>
    </GestureHandlerRootView>
  );
}

