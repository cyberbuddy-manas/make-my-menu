import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

const BASE_URL = 'https://98bd-112-196-112-74.ngrok-free.app/api';

export const BaseAxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const AuthAxiosInstance = axios.create({
  baseURL: BASE_URL,
});

AuthAxiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      const err = error as Error;
      Alert.alert('Error retrieving token', err?.message || 'Unknown error');
    }
    return config;
  },
  (error) => {
    Alert.alert('Error', error?.message);
    return Promise.reject(error);
  }
);

export function Login(data: object) {
  return BaseAxiosInstance({
    method: 'post',
    url: '/user/login',
    data: data,
  });
}

export function SendOtp(data: object) {
  return BaseAxiosInstance({
    method: 'post',
    url: '/user/send-login-otp',
    data: data,
  });
}

export function onBoardRestaurant(data: object) {
  return AuthAxiosInstance({
    method: 'post',
    url: '/api/restaurant',
    data: data,
  });
}

export function getRestaurants() {
  return AuthAxiosInstance({
    method: 'get',
    url: '/api/restaurants',
  });
}
