// import { Alert } from "react-native";
import { Alert } from 'react-native';
import {
  GetRestaurants,
  Login,
  OnBoardRestaurant,
  SendOtp,
  UpdateRestaurant,
} from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthCheckRoute } from '../util/routes';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearGlobal,
  storeCurrentUser,
  storeRestaurants,
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
  authToken: { token: string };
}

interface RegisterLoginResponse {
  user: User;
  message: string;
}

interface RestaurantResponse {
  restaurants: object[];
}

export const useAuthHook = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const sendLoginOtp = async (data: object) => {
    try {
      const response: ApiResponse<RegisterLoginResponse> = await SendOtp(data);
      console.log('login', response?.data);
      // await AsyncStorage.setItem('token', response?.data?.token);
      // await AsyncStorage.setItem('user', JSON.stringify(response?.data?.user));
      // dispatch(storeCurrentUser(response?.data?.user));
      // dispatch(storeToken(response?.data?.token));

      Alert.alert('Success', response?.data?.message);
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: AuthCheckRoute }],
      // });
    } catch (error: any) {
      Alert.alert('Error', error?.response?.data?.message ?? error?.message);
    }
  };

  const loginUser = async (data: object) => {
    try {
      const response: ApiResponse<RegisterLoginResponse> = await Login(data);
      console.log('login', response?.data);
      await AsyncStorage.setItem(
        'token',
        response?.data?.user?.authToken?.token
      );
      await AsyncStorage.setItem('user', JSON.stringify(response?.data?.user));
      dispatch(storeCurrentUser(response?.data?.user));
      dispatch(storeToken(response?.data?.user?.authToken?.token));

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
        routes: [{ name: AuthCheckRoute }],
      });
    } catch (error: any) {
      Alert.alert('Error', error?.message);
    }
  };

  return { loginUser, sendLoginOtp, logoutUser };
};

export const useUserHook = () => {
  const dispatch = useDispatch();
};

export const useRestaurantHook = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  async function getRestaurants() {
    try {
      const response: ApiResponse<RestaurantResponse> = await GetRestaurants();
      console.log('res', response?.data);

      dispatch(storeRestaurants(response?.data?.restaurants));
    } catch (error: any) {
      Alert.alert('Error', error?.message);
    }
  }
  async function onBoardRestaurant(data: object) {
    try {
      const response: ApiResponse<RestaurantResponse> = await OnBoardRestaurant(
        data
      );
      console.log('login', response?.data);
      getRestaurants();
    } catch (error: any) {
      Alert.alert('Error', error?.message);
    }
  }
  async function updateRestaurant(data: object) {
    try {
      const response: ApiResponse<RestaurantResponse> = await UpdateRestaurant(
        data,
        data?._id
      );
      console.log('restaurants', response?.data);
      getRestaurants();
    } catch (error: any) {
      Alert.alert('Error', error?.message);
    }
  }
  return { onBoardRestaurant, getRestaurants, updateRestaurant };
};
