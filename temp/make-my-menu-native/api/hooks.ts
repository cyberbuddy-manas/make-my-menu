// import { Alert } from "react-native";
import { Alert } from 'react-native';
import { Login, Register } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthCheckRoute } from '../util/routes';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearGlobal,
  storeCurrentUser,
  storeToken,
} from '../store/globalSlice';
import { StackNavigationProp } from '@react-navigation/stack';

import { createUniqueIdentifier } from '../util/functions';

interface ApiResponse<T> {
  data: T;
}

interface User {
  id: string;
  name: string;
}

interface RegisterLoginResponse {
  token: string;
  user: User;
  message: string;
}

export const useAuthHook = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const registerUser = async (data: object) => {
    try {
      const response: ApiResponse<RegisterLoginResponse> = await Register(data);
      console.log('register', response?.data);
      await AsyncStorage.setItem('token', response?.data?.token);
      await AsyncStorage.setItem('user', JSON.stringify(response?.data?.user));
      dispatch(storeCurrentUser(response?.data?.user));
      dispatch(storeToken(response?.data?.token));

      Alert.alert('Success', response?.data?.message);
      navigation.reset({
        index: 0,
        routes: [{ name: AuthCheckRoute }],
      });
    } catch (error: any) {
      Alert.alert('Error', error?.response?.data?.message ?? error?.message);
    }
  };

  const loginUser = async (data: object) => {
    try {
      const response: ApiResponse<RegisterLoginResponse> = await Login(data);
      console.log('login', response?.data);
      await AsyncStorage.setItem('token', response?.data?.token);
      await AsyncStorage.setItem('user', JSON.stringify(response?.data?.user));
      dispatch(storeCurrentUser(response?.data?.user));
      dispatch(storeToken(response?.data?.token));

      Alert.alert('Success', response?.data?.message);
      navigation.reset({
        index: 0,
        routes: [{ name: AuthCheckRoute }],
      });
    } catch (error: any) {
      Alert.alert('Error', error?.response?.data?.message ?? error?.message);
    }
  };

  const logoutUser = async () => {
    try {
      await AsyncStorage.clear();
      dispatch(clearGlobal());

      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthCheckRoute' }],
      });
    } catch (error: any) {
      Alert.alert('Error', error?.message);
    }
  };

  return { registerUser, loginUser, logoutUser };
};

export const useUserHook = () => {
  const dispatch = useDispatch();
};
