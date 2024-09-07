import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import React from 'react';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: "tomato",
    // secondary: "yellow",
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <StackNavigator />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
