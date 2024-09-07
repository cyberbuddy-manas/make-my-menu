import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

const BASE_URL = 'http://192.168.1.4:8000/api';

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

export function Register(data: object) {
  return BaseAxiosInstance({
    method: 'post',
    url: '/auth/register',
    data: data,
  });
}

export function Login(data: object) {
  return BaseAxiosInstance({
    method: 'post',
    url: '/auth/login',
    data: data,
  });
}
