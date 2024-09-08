import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WithSafeArea from './components/WithSafeArea';
import {
  AddMenuItemRoute,
  AddRestaurantRoute,
  AppStackRoute,
  AuthCheckRoute,
  AuthStackRoute,
  HomeRoute,
  HomeViewRoute,
  IntroRoute,
  LoginRoute,
  MenuRoute,
  onBoardRestaurantRoute,
  OtpRoute,
} from './util/routes';
import AuthCheck from './components/AuthCheck';
import AxiosInterceptor from './components/AxiosInterceptor';
import OtpScreen from './screens/OtpScreen';
import IntroScreen from './screens/IntroScreen';
import OnBoardRestaurantScreen from './screens/OnBoardRestaurantScreen';
import MenuScreen from './screens/MenuScreen';
import AddRestaurant from './screens/AddRestaurant';
import AddMenuItem from './screens/AddMenuItem';
import HomeView from './screens/HomeView'

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={IntroRoute}
        component={WithSafeArea(IntroScreen)}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={LoginRoute}
        component={WithSafeArea(LoginScreen)}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={OtpRoute}
        component={WithSafeArea(OtpScreen)}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={HomeViewRoute} component={HomeView} options={{ headerShown: false }} />
      <Stack.Screen name={HomeRoute} component={HomeScreen} />
      <Stack.Screen name={AddRestaurantRoute} component={AddRestaurant} options={{ headerShown: false }} />
      <Stack.Screen name={AddMenuItemRoute} component={AddMenuItem} options={{ headerShown: false }} />
      <Stack.Screen
        name={onBoardRestaurantRoute}
        component={OnBoardRestaurantScreen}
      />
      <Stack.Screen name={MenuRoute} component={MenuScreen} />
    </Stack.Navigator >
  );
};

export default function StackNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AxiosInterceptor>
          <Stack.Navigator>
            <Stack.Screen
              name={AuthCheckRoute}
              component={WithSafeArea(AuthCheck)}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={AuthStackRoute}
              component={AuthStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={AppStackRoute}
              component={AppStack}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </AxiosInterceptor>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
